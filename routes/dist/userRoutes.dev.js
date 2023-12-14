"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/userController"),
    registerUser = _require.registerUser,
    loginUser = _require.loginUser,
    currentUser = _require.currentUser;

var validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
module.exports = router;