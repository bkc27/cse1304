const express = require("express");
const { registerUser } = require("../controllers/authController");
const { builtinModules } = require("node:module");
const router = express.Router();

router.post("/register",registerUser);

module.exports = router;