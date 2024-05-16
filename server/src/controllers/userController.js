const User = require("../model/User");

const { hashedPassword } = require("../utils/hashmac_pwd");

const getUser = async (req, res) => {
  console.log(req.body);
  const { username, emailId } = req.body;

  if (!username || !emailId) {
    return res.sendStatus(406);
  }

  try {
    const foundUser = await User.findOne({
      "user_details.username": username,
      "user_details.emailId": emailId,
    })
      .lean()
      .exec();

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
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

    res.status(200).json(newUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  const { id, username, emailId, shopname, address, password } = req.body;

  if (!id || !password) {
    return res.sendStatus(406);
  }

  const updatedDoc = {};

  if (username) updatedDoc["user_details.username"] = username;
  if (emailId) updatedDoc["user_details.email"] = emailId;
  if (shopname) updatedDoc["shop_details.shopname"] = shopname;
  if (address) updatedDoc["shop_details.address"] = address;

  try {
    const hashPwd = hashedPassword("sha256", process.env.PWD_SALT, password);

    const findUser = await User.findById(id).lean().exec();

    if (findUser.user_details.password !== hashPwd) {
      return res.sendStatus(401);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedDoc },
      {
        new: true,
      }
    )
      .lean()
      .exec();

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.sendStatus(406);
  }

  try {
    const hashPwd = hashedPassword("sha256", process.env.PWD_SALT, password);

    const findUser = await User.findById(id).lean().exec();

    if (findUser.user_details.password === hashPwd) {
      return res.sendStatus(401);
    }

    const deletedUser = await User.findByIdAndDelete(id).lean().exec();

    if (!deletedUser) {
      return res.sendStatus(404);
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
