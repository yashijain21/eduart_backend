// utils/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // your Gmail
    pass: process.env.EMAIL_PASS   // app password, not your Gmail password
  }
});

export const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Eduart Courses" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
