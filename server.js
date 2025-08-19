// server.js (ESM)

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Load environment variables
dotenv.config();

// Routes (make sure all route files use .js extension in imports)
import registrationRoutes from "./routes/registration_routes.js";
import courseRoutes from "./routes/Courses_routes.js";
import FacultyRoutes from "./routes/Faculty_routes.js";
import StudentRoutes from "./routes/Student_routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mount routes
app.use("/api/courses", courseRoutes);
app.use("/api/faculty", FacultyRoutes);
app.use("/api/student", StudentRoutes);
app.use("/api/registrations", registrationRoutes);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eduart_uploads", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed file types
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post("/api/uploads", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ path: req.file.path }); // Cloudinary returns the public URL here
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
