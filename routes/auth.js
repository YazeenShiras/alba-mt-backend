const express = require("express");

const { register, login, user } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", user);

module.exports = router;
