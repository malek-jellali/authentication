"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/contactController"),
    getContacts = _require.getContacts,
    getContact = _require.getContact,
    deleteContact = _require.deleteContact,
    updateContact = _require.updateContact,
    createContact = _require.createContact;

var validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").get(getContact);
router.route("/:id")["delete"](deleteContact);
module.exports = router;