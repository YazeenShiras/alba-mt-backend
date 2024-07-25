require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const jwt_secret = process.env.JWT_SECRET;

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

    const token = jwt.sign({ userId: user._id }, jwt_secret, {
      expiresIn: "1h",
    });

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
