const { db } = require('../config/firebase');

// Create a new series
exports.createSeries = async (req, res) => {
  try {
    const {
      towerId,
      seriesName,
      isDuplicate,
      typology,
      bhkType,
      addOns,
      bedrooms,
      livingDining,
      bathrooms,
      balconies,
      seriesExitDirection,
      unitCarpetArea
    } = req.body;

    const series = {
      towerId,
      seriesName,
      isDuplicate,
      typology,
      bhkType,
      addOns,
      bedrooms,
      livingDining,
      bathrooms,
      balconies,
      seriesExitDirection,
      unitCarpetArea,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('series').add(series);
    res.status(201).json({ id: docRef.id, ...series });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all series
exports.getAllSeries = async (req, res) => {
  try {
    const snapshot = await db.collection('series').get();
    const seriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(seriesList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single series by ID
exports.getSeriesById = async (req, res) => {
  try {
    const docRef = await db.collection('series').doc(req.params.id).get();
    if (!docRef.exists) {
      return res.status(404).json({ message: 'Series not found' });
    }
    res.status(200).json({ id: docRef.id, ...docRef.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a series
exports.updateSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updatedAt: new Date() };
    await db.collection('series').doc(id).update(updatedData);
    res.status(200).json({ message: 'Series updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a series
exports.deleteSeries = async (req, res) => {
  try {
    await db.collection('series').doc(req.params.id).delete();
    res.status(200).json({ message: 'Series deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};