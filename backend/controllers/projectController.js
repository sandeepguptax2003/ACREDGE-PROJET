const { db } = require('../config/firebase');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      reraStatus,
      reraNumber,
      startingPrice,
      mediaLinks,
      status
    } = req.body;

    const project = {
      name,
      reraStatus,
      reraNumber,
      startingPrice,
      mediaLinks,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('projects').add(project);
    res.status(201).json({ id: docRef.id, ...project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const docRef = await db.collection('projects').doc(req.params.id).get();
    if (!docRef.exists) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ id: docRef.id, ...docRef.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updatedAt: new Date() };
    await db.collection('projects').doc(id).update(updatedData);
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    await db.collection('projects').doc(req.params.id).delete();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};