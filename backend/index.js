const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const tournamentRoutes = require('./routes/tournaments');
const achievementRoutes = require('./routes/achievements');
const sponsorRoutes = require('./routes/sponsors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/sponsors', sponsorRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Benidisc API ready.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
