const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Project = require('./models/project'); // Make sure this file exists

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static frontend files

// ✅ Correct MongoDB URI (27017 is the default MongoDB port)
const MONGO_URI = 'mongodb+srv://a98879081:anas@cluster0.lecjxfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Optional: log once connected
mongoose.connection.once('open', () => {
  console.log('🟢 Connected to MongoDB:', mongoose.connection.name);
});

// ---------------- Routes ---------------- //

// ✅ GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: '❌ Could not fetch projects. Please try again later.' });
  }
});

// ✅ POST a new project
app.post('/api/projects', async (req, res) => {
  const { name, url, description } = req.body;

  if (!name || !url || !description) {
    return res.status(400).json({ message: '❌ All fields are required.' });
  }

  try {
    const newProject = new Project({ name, url, description });
    await newProject.save();
    res.status(201).json({ message: '✅ Project added successfully!', project: newProject });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to save the project.' });
  }
});

// ✅ DELETE a project by ID
app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: '❌ Project not found.' });
    }
    res.status(200).json({ message: '✅ Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: '❌ Could not delete the project.' });
  }
});

// ✅ Serve your frontend page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pgprojects.html')); // Or pgcontact.html, adjust as needed
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
