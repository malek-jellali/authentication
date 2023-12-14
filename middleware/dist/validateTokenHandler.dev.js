"use strict";

var asyncHandler = require("express-async-handler");

var jwt = require("jsonwebtoken");

var validateToken = asyncHandler(function _callee(req, res, next) {
  var token, authHeader;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers.Authorization || req.headers.authorization;

          if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
          }

          if (token) {
            _context.next = 5;
            break;
          }

          res.status(401);
          throw new Error("User is not authorized or token is missing");

        case 5:
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
              res.status(401);
              throw new Error("User is not authorized");
            }

            console.log(decoded.user);
            req.user = decoded.user;
            next();
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = validateToken;