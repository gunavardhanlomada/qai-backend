const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");




exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

   
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SEND_USER,
      replyTo: req.body.email,
      subject: `New message from ${req.body.name} - ${req.body.Subject}`,
      text: `
    
    Subject: ${req.body.Subject}

    Message:
    ${req.body.message}

    Thanking You,
    Name: ${req.body.name}
    Email: ${req.body.email}
    Phone: ${req.body.phoneno || "N/A"}  
    `,
    };


    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Contact saved and email sent."});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET: All contact submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

// PATCH: Update status only
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Started", "In Progress", "Closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Contact not found." });

    res.status(200).json({ message: "Status updated." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
