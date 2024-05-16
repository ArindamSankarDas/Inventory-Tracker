const User = require("../model/User");

const { hashedPassword } = require("../utils/hashmac_pwd");

const getUser = async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.sendStatus(406);
  }

  try {
    const foundUser = await User.findOne({
      user_details: { username, email },
    })
      .lean()
      .exec();

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.status(404).json(foundUser);
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

    const newPwd = await hashedPassword(
      "sha256",
      process.env.PWD_SALT,
      password
    );

    const newUser = await User.create({
      user_details: {
        username,
        emailId,
        password: newPwd,
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
    console.log(error);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  console.log(req);
  const { id, username, emailId, shopname, address } = req.body;

  if (!id) {
    return res.sendStatus(406);
  }

  try {
    const updatedDoc = {};

    if (username) updatedDoc["user_details.username"] = username;
    if (emailId) updatedDoc["user_details.email"] = emailId;
    if (shopname) updatedDoc["shop_details.shopname"] = shopname;
    if (address) updatedDoc["shop_details.address"] = address;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedDoc },
      {
        new: true,
      }
    ).exec();

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.sendStatus(406);
  }

  try {
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
