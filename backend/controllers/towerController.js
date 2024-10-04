const { db } = require('../config/firebase');

// Create a new tower
exports.createTower = async (req, res) => {
  try {
    const {
      projectId,
      developerId,
      towerNumber,
      towerName,
      towerPhase,
      developerPhase,
      phaseReraNumber,
      deliveryTimeline,
      currentStatus,
      isDuplicate,
      totalFloors,
      towerCore,
      totalApartments,
      basementParkingLevels,
      hasStiltParking,
      lobby,
      hasTerrace,
      refugeArea,
      exitStairs,
      lifts
    } = req.body;

    const tower = {
      projectId,
      developerId,
      towerNumber,
      towerName,
      towerPhase,
      developerPhase,
      phaseReraNumber,
      deliveryTimeline,
      currentStatus,
      isDuplicate,
      totalFloors,
      towerCore,
      totalApartments,
      basementParkingLevels,
      hasStiltParking,
      lobby,
      hasTerrace,
      refugeArea,
      exitStairs,
      lifts,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('towers').add(tower);
    res.status(201).json({ id: docRef.id, ...tower });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all towers
exports.getAllTowers = async (req, res) => {
  try {
    const snapshot = await db.collection('towers').get();
    const towers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(towers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single tower by ID
exports.getTowerById = async (req, res) => {
  try {
    const docRef = await db.collection('towers').doc(req.params.id).get();
    if (!docRef.exists) {
      return res.status(404).json({ message: 'Tower not found' });
    }
    res.status(200).json({ id: docRef.id, ...docRef.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tower
exports.updateTower = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updatedAt: new Date() };
    await db.collection('towers').doc(id).update(updatedData);
    res.status(200).json({ message: 'Tower updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a tower
exports.deleteTower = async (req, res) => {
  try {
    await db.collection('towers').doc(req.params.id).delete();
    res.status(200).json({ message: 'Tower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};