const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
import registrationRoutes from "./routes/registration_routes.js";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Yashi:1234@yashiscluster.nmndmfm.mongodb.net/Eduart?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import your route modules
const courseRoutes = require('./routes/Courses_routes');
const FacultyRoutes = require('./routes/Faculty_routes');
const StudentRoutes = require('./routes/Student_routes');

// Mount your routes on specific path prefixes
app.use('/api/courses', courseRoutes);
app.use('/api/Faculty', FacultyRoutes);
app.use('/api/Student', StudentRoutes);
app.use("/api/registrations", registrationRoutes);
// Setup static folder to serve uploaded images
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to uploads/ folder
  },
  filename: function (req, file, cb) {
    // Use timestamp + original filename to avoid collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Upload image endpoint
app.post('/api/uploads', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the public URL of the uploaded image
  const fileUrl = `${req.protocol}://${req.get('host')}/api/uploads/${req.file.filename}`;

  res.json({ path: fileUrl });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
