const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const tournamentRoutes = require('./routes/tournaments');
const achievementRoutes = require('./routes/achievements');
const sponsorRoutes = require('./routes/sponsors');
const newsRoutes = require('./routes/news');
const eventRoutes = require('./routes/events');
const trainingRoutes = require('./routes/trainings');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/trainings', trainingRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Benidisc API ready.' });
});

// Serve frontend static files
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

// SPA fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
