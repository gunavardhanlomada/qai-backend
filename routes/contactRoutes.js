const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.post("/request", createContact);
router.get("/getdetails", protect, getContacts);
router.patch("/status/:id", protect, updateContactStatus);

module.exports = router;
