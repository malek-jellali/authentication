"use strict";

var asyncHandler = require("express-async-handler");

var User = require("../models/userModel");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt"); //@desc Register a user
//@route POST /api/users/register
//@access private


var registerUser = asyncHandler(function _callee(req, res) {
  var _req$body, username, email, password, userAvailable, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;

          if (!(!username || !email || !password)) {
            _context.next = 4;
            break;
          }

          res.status(400);
          throw new Error("all fields are mandatory!");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          userAvailable = _context.sent;

          if (!userAvailable) {
            _context.next = 10;
            break;
          }

          res.status(400);
          throw new Error("user already registered!");

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 12:
          hashedPassword = _context.sent;
          console.log("hashed password :", hashedPassword);
          _context.next = 16;
          return regeneratorRuntime.awrap(User.create({
            username: username,
            email: email,
            password: hashedPassword
          }));

        case 16:
          user = _context.sent;
          console.log("User created ".concat(user));

          if (!user) {
            _context.next = 22;
            break;
          }

          res.status(201).json({
            _id: user.id,
            email: user.email
          });
          _context.next = 24;
          break;

        case 22:
          res.status(400);
          throw new Error("user data us not valid");

        case 24:
          res.json({
            message: "Register the user"
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc login a user
//@route POST /api/users/login
//@access private

var loginUser = asyncHandler(function _callee2(req, res) {
  var _req$body2, email, password, user, accessToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          res.status(400);
          throw new Error("All fields are mandatory ! ");

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          user = _context2.sent;
          _context2.t0 = user;

          if (!_context2.t0) {
            _context2.next = 12;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          _context2.t0 = _context2.sent;

        case 12:
          if (!_context2.t0) {
            _context2.next = 17;
            break;
          }

          accessToken = jwt.sign({
            user: {
              username: user.username,
              email: user.email,
              id: user.id
            }
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
          });
          res.status(200).json({
            accessToken: accessToken
          });
          _context2.next = 19;
          break;

        case 17:
          res.status(401);
          throw new Error("email or password not valid ");

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc current user info
//@route POST /api/users/current
//@access private

var currentUser = asyncHandler(function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.json(req.user);

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  currentUser: currentUser
};