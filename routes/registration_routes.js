const express = require("express");
const Registration = require("../models/Registration");
const { transporter } = require("../utils/mailer");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, courseId, fees, title, dateRange, venue } = req.body;

    const registration = new Registration({
      name,
      email,
      phone,
      courseId,
      fees,
      title,
      dateRange,
      venue
    });

    await registration.save();

    // ✅ Email template
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background: #f9f9f9;">
        <h2 style="color:#0b1d3a;">🎉 Your registration is complete!</h2>
        <p style="font-size:16px; color:#333;">Thank you <b>${name}</b> for registering for <b>${title}</b>.</p>

        <div style="margin: 20px auto; padding: 15px; background:#fff; border-radius: 10px; max-width: 500px; text-align: left; box-shadow:0 2px 5px rgba(0,0,0,0.1)">
          <p><b>📅 Date:</b> ${dateRange}</p>
          <p><b>📍 Venue:</b> ${venue}</p>
          <p><b>💰 Fees:</b> ${fees}</p>
          <p><b>📞 Phone:</b> ${phone}</p>
        </div>

        <h3 style="margin-top:30px; color:#555;">The course begins soon...</h3>
        <p style="font-size:14px; color:#777;">We’ll also send you a reminder 1 day before your course starts.</p>

        <div style="margin-top:20px;">
          <a href="#" style="margin:5px; display:inline-block; padding:10px 20px; background:#ea4c89; color:white; border-radius:5px; text-decoration:none;">Add to Google Calendar</a>
          <a href="#" style="margin:5px; display:inline-block; padding:10px 20px; background:#6c63ff; color:white; border-radius:5px; text-decoration:none;">Add to Outlook</a>
          <a href="#" style="margin:5px; display:inline-block; padding:10px 20px; background:#00b894; color:white; border-radius:5px; text-decoration:none;">Add to iCal</a>
        </div>

        <p style="margin-top:40px; font-size:12px; color:#aaa;">© Eduart Courses • Please do not reply directly to this email.</p>
      </div>
    `;

    // ✅ Send email
    await transporter.sendMail({
      from: `"Eduart Courses" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Registration Successful – " + title,
      html: htmlTemplate
    });

    res.status(201).json({ message: "Registration successful & email sent!" });

  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("courseId", "title fees")
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


module.exports = router;
