const { db } = require('../config/firebase');

// Create a new developer
exports.createDeveloper = async (req, res) => {
  try {
    const {
      name,
      address,
      incorporationDate,
      totalProjectsDelivered,
      totalSqFtDelivered,
      reasonForChoosing,
      websiteLink,
      status
    } = req.body;

    const developer = {
      name,
      address,
      incorporationDate,
      totalProjectsDelivered,
      totalSqFtDelivered,
      reasonForChoosing,
      websiteLink,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('developers').add(developer);
    res.status(201).json({ id: docRef.id, ...developer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all developers
exports.getAllDevelopers = async (req, res) => {
  try {
    const snapshot = await db.collection('developers').get();
    const developers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single developer by ID
exports.getDeveloperById = async (req, res) => {
  try {
    const docRef = await db.collection('developers').doc(req.params.id).get();
    if (!docRef.exists) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.status(200).json({ id: docRef.id, ...docRef.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a developer
exports.updateDeveloper = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updatedAt: new Date() };
    await db.collection('developers').doc(id).update(updatedData);
    res.status(200).json({ message: 'Developer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a developer
exports.deleteDeveloper = async (req, res) => {
  try {
    await db.collection('developers').doc(req.params.id).delete();
    res.status(200).json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};