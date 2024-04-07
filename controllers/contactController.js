// controllers/contactController.js
const ContactMessage = require('../models/ContactMessage');
const { sendContactEmail } = require('../utils/emailSender');

exports.handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Optionally save the message in the database
  const contactMessage = new ContactMessage({ name, email, message });
  await contactMessage.save();

  // Send the email
  try {
    await sendContactEmail({ name, email, message });
    res.status(200).json({ message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send your message.' });
  }
};
