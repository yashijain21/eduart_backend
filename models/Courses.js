 const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: String,

  fees: String,               // Changed from price:Number to fees:String (₹ formatted)
  batchSize: String,          // e.g. "10 Students"
  skillLevel: String,         // e.g. "Beginner to Intermediate"
  whatYouLearn: [String],     // array of strings
  courseContent: [String],    // array of strings

  dateRange: String,          // e.g. "4 - 5 Jan 2025"
  detailsDate: String,        // e.g. "5 January 2025"
  venue: String,              // e.g. "Eduart Delhi"

  photoUrl: String,           // URL or path to course image

  status: String,
  category: String,

  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);