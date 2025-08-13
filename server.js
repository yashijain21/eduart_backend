// server.js (CommonJS)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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

// Serve static uploads
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post("/api/uploads", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/api/uploads/${req.file.filename}`;
  res.json({ path: fileUrl });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
