const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: `New contact message from ${name}`,
    text: `You have received a new message from ${name} (${email}): \n\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};
