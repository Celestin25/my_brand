const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage"); 
const { handleContactForm } = require("../controllers/contactController");

router.post("/contact", handleContactForm);


router.get("/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).json({ message: "Failed to get messages" });
  }
});


module.exports = router;


