const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});