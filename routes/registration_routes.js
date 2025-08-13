import express from "express";
const router = express.Router();
import Registration from "../models/Registration.js";

// POST: register for a course
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, courseId, fees } = req.body;

    const registration = new Registration({
      name,
      email,
      phone,
      courseId,
      fees
    });

    await registration.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
