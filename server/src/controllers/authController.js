const User = require("../model/User");
const jwt = require("jsonwebtoken");

const { hashedPassword } = require("../utils/hashmac_pwd");

const handleRegister = async (req, res, next) => {
  const { username, emailId, password, shopname, address } = req.body;

  if (!username || !emailId || !password || !shopname || !address) {
    return res.sendStatus(406);
  }

  try {
    const duplicate = await User.findOne({
      "user_details.username": username,
      "user_details.emailId": emailId,
    })
      .lean()
      .exec();

    if (duplicate) {
      return res.sendStatus(409);
    }

    const hashPwd = hashedPassword("sha256", process.env.PWD_SALT, password);

    const newUser = await User.create({
      user_details: {
        username,
        emailId,
        password: hashPwd,
      },
      shop_details: {
        shopname,
        address,
      },
    });

    if (!newUser) {
      return res.sendStatus(400);
    }

    req.body = {
      emailId,
      password,
    };

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

const handleLogin = async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.sendStatus(406);
  }

  try {
    const foundUser = await User.findOne({
      "user_details.emailId": emailId,
    }).exec();

    if (!foundUser) {
      return res.sendStatus(401);
    }

    const match =
      hashedPassword("sha256", process.env.PWD_SALT, password) ===
      foundUser.user_details.password;

    if (!match) {
      return res.sendStatus(401);
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          emailId: foundUser.user_details.emailId,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { emailId: foundUser.user_details.emailId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnlly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ userDetails: foundUser, accessToken });
  } catch (error) {
    res.sendStatus(500);
  }
};

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      const foundUser = await User.findOne({
        "user_details.emailId": decoded.emailId,
      });

      if (!foundUser) {
        return res.sendStatus(401);
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            emailId: foundUser.user_details.emailId,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.status(200).json({ accessToken });
    }
  );
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return req.sendStatus(204);
  }

  res.clearCookie("jwt", {
    httpOnlly: true,
    sameSite: "none",
    secure: true,
  });

  res.sendStatus(200);
};

module.exports = {
  handleRegister,
  handleLogin,
  handleRefresh,
  handleLogout,
};
