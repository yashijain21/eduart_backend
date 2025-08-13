// models/Registration.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
}, { timestamps: true });

export default mongoose.model("Registration", registrationSchema);
