//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ massage: "get all contacts" });
};

//@desc get contact
//@route GET /api/contacts/:id
//@access public

const getContact = (req, res) => {
  res.status(200).json({ massage: `get contact for ${req.params.id}` });
};

//@desc create New contact
//@route POST /api/contacts
//@access public

const createContact = (req, res) => {
  console.log("the request body is :", req.body);
  //error handling stuff
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mendatory ");
  }
  res.status(201).json({ massage: "create contacts" });
};

//@desc update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
};

//@desc delete contact
//@route PUT /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
};

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  createContact,
};
