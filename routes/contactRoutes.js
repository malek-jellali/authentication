const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  createContact,
} = require("../controllers/contactController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").get(getContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
