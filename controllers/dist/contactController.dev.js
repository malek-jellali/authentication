"use strict";

var asyncHandler = require("express-async-handler"); //we dont need to write all the try catch blocs , asyncHandler whenever an exception occur is gonna pass it to the error handler


var Contact = require("../models/contactModel"); //const updatedContact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access private


var getContacts = asyncHandler(function _callee(req, res) {
  var contacts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Contact.find({
            user_id: req.user.id
          }));

        case 2:
          contacts = _context.sent;
          res.status(200).json(contacts);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc get contact
//@route GET /api/contacts/:id
//@access private

var getContact = asyncHandler(function _callee2(req, res) {
  var contact;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Contact.findById(req.params.id));

        case 2:
          contact = _context2.sent;

          if (contact) {
            _context2.next = 6;
            break;
          }

          res.status(404);
          throw new Error("contact not found!!!!! ");

        case 6:
          res.status(200).json(contact);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc create New contact
//@route POST /api/contacts
//@access private

var createContact = asyncHandler(function _callee3(req, res) {
  var _req$body, name, email, phone, contact;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("the request body is :", req.body); //error handling stuff

          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone;

          if (!(!name || !email || !phone)) {
            _context3.next = 5;
            break;
          }

          res.status(400);
          throw new Error("All fields are mendatory ");

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Contact.create({
            name: name,
            email: email,
            phone: phone,
            user_id: req.user.id
          }));

        case 7:
          contact = _context3.sent;
          res.status(201).json(contact);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc update contact
//@route PUT /api/contacts/:id
//@access private

var updateContact = asyncHandler(function _callee4(req, res) {
  var contact, updatedContact;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Contact.findById(req.params.id));

        case 2:
          contact = _context4.sent;

          if (contact) {
            _context4.next = 6;
            break;
          }

          res.status(404);
          throw new Error("contact not found !!!!!!!!!!!!!!!!!!!!!");

        case 6:
          if (!(contact.user_id.toString() !== request.user.id)) {
            _context4.next = 9;
            break;
          }

          res.status(403);
          throw new Error("user don't have the permission to update other user contacts ");

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(Contact.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 11:
          updatedContact = _context4.sent;
          res.status(200).json(updatedContact);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc delete contact
//@route PUT /api/contacts/:id
//@access private

var deleteContact = asyncHandler(function _callee5(req, res) {
  var contact;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Contact.findById(req.params.id));

        case 2:
          contact = _context5.sent;

          if (contact) {
            _context5.next = 6;
            break;
          }

          res.status(404);
          throw new Error("contact not found!!!!! ");

        case 6:
          if (!(contact.user_id.toString() !== request.user.id)) {
            _context5.next = 9;
            break;
          }

          res.status(403);
          throw new Error("user don't have the permission to update other user contacts ");

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(Contact.deleteOne());

        case 11:
          res.status(200).json(contact);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  getContacts: getContacts,
  getContact: getContact,
  deleteContact: deleteContact,
  updateContact: updateContact,
  createContact: createContact
}; //mongodb and operations like delete update ..data needs time thats why we need to pass it as promises --> the use of async ,
//express async handler , gonna handle the exceptions inside the async express routes and pass them to the express errorhandler