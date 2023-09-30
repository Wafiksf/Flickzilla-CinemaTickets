const nodemailer = require("nodemailer");

//add
module.exports.sendContactEmail = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
    });

   // Email message for your inbox
   const inboxMessage = {
    from: email,
    to: process.env.USER,
    subject: subject,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email
  };

  // Email message for the automatic reply
  const automaticReplyMessage = {
    from: process.env.USER,
    to: email, // Send the reply to the user's email
    subject: "Thank You for Contacting Us",
    text: "Thank you for reaching out to us. We appreciate your interest. Our team will get in touch with you soon."
  };

  // Send inbox email
  transporter.sendMail(inboxMessage, (inboxError, inboxInfo) => {
    if (inboxError) {
      console.log("Error sending inbox email:", inboxError);
    } else {
      console.log("Inbox email sent successfully:", inboxInfo.response);
    }
  });

  // Send automatic reply email
  transporter.sendMail(automaticReplyMessage, (replyError, replyInfo) => {
    if (replyError) {
      console.log("Error sending automatic reply:", replyError);
    } else {
      console.log("Automatic reply sent successfully:", replyInfo.response);
    }
  });

  res.status(200).json({ msg: "Thank you for your message. It has been sent." });
} catch (err) {
  console.log("Error:", err);
  res.status(500).json({ msg: "Internal Server Error." });
}
};
