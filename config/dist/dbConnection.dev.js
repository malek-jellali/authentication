"use strict";

var mongoose = require("mongoose");

var connectDb = function connectDb() {
  var connect;
  return regeneratorRuntime.async(function connectDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.CONNECTION_STRING));

        case 3:
          connect = _context.sent;
          console.log("database connected:", connect.connection.host, connect.connection.name);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          process.exit(1);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = connectDb;