const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      let newPass;

      await bcrypt
        .hash(password, 10)
        .then((hash) => {
          console.log("Hash", hash);
          newPass = hash;
        })
        .catch((err) => console.error(err.message));

      console.log(newPass);

      user = new User({ username, password: newPass, role: "Admin" });
      await user.save();
      res.status(201).json({
        status: 200,
        message: "User registered successfully",
      });
    } else {
      res.status(201).json({
        status: 400,
        message: "Username already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "username not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      "43deb15d7344ab1a233986cc140e9914a17a9cc347560d352eabf8498450962c",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token: token, data: user });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const user = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(201).json({ data: user });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { register, login, user };
