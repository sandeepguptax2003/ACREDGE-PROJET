require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { admin, db } = require('./config/firebase');

const developerRoutes = require('./routes/developerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const towerRoutes = require('./routes/towerRoutes');
const seriesRoutes = require('./routes/seriesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/developers', developerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/towers', towerRoutes);
app.use('/api/series', seriesRoutes);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});