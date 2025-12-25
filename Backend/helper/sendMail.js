import nodemailer from "nodemailer";

// Send Mail Function
const sendMail = async (to, subject, text) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL,
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.log("Error sending email:", error);
    return false;
  }
};

export default sendMail;
