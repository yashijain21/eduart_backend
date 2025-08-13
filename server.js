// server.js (CommonJS)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// Routes
const registrationRoutes = require("./routes/registration_routes");
const courseRoutes = require("./routes/Courses_routes");
const FacultyRoutes = require("./routes/Faculty_routes");
const StudentRoutes = require("./routes/Student_routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://Yashi:1234@yashiscluster.nmndmfm.mongodb.net/Eduart?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Mount routes
app.use("/api/courses", courseRoutes);
app.use("/api/Faculty", FacultyRoutes);
app.use("/api/Student", StudentRoutes);
app.use("/api/registrations", registrationRoutes);





// Cloudinary config
cloudinary.config({
  cloud_name: "dfg7wekwd", // Your Cloudinary cloud name
  api_key: "688956946867593", // Your API key
  api_secret: "Xrbja7I2DBk331fXNR7CrvlqSjI", // Your API secret
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
  console.log(`Server running on port ${PORT}`);
});
