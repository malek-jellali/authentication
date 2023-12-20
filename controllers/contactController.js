const asyncHandler = require("express-async-handler");
//we dont need to write all the try catch blocs , asyncHandler whenever an exception occur is gonna pass it to the error handler

const Contact = require("../models/contactModel");
//const updatedContact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found!!!!! ");
  }
  res.status(200).json(contact);
});

//@desc create New contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is :", req.body);
  //error handling stuff
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mendatory ");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found !!!!!!!!!!!!!!!!!!!!!");
  }

  if (contact.user_id.toString() !== request.user.id) {
    res.status(403);
    throw new Error(
      "user don't have the permission to update other user contacts "
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc delete contact
//@route PUT /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found!!!!! ");
  }
  if (contact.user_id.toString() !== request.user.id) {
    res.status(403);
    throw new Error(
      "user don't have the permission to update other user contacts "
    );
  }

  await Contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  createContact,
};

//mongodb and operations like delete update ..data needs time thats why we need to pass it as promises --> the use of async ,
//express async handler , gonna handle the exceptions inside the async express routes and pass them to the express errorhandler
