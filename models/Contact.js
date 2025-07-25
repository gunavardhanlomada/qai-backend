const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phoneno: {
      type: Number,
    },
    Subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["Recived", "In Progress", "Closed"],
      default: "Recived",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
