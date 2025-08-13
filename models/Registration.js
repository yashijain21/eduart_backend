const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    fees: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
