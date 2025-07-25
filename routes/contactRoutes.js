const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
} = require("../controllers/contactController");

router.post("/request", createContact);
router.get("/getdetails", getContacts);
router.patch("/status/:id", updateContactStatus);

module.exports = router;
