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
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

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
  // Warn if JWT_SECRET not set
  if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Set JWT_SECRET in environment variables for secure authentication.');
  }

  // Optionally create an admin user on startup when ADMIN_EMAIL + ADMIN_PASSWORD are provided
  (async () => {
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (adminEmail && adminPassword) {
        const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
        if (!existing) {
          const hashed = bcrypt.hashSync(adminPassword, 10);
          const created = await prisma.user.create({ data: { email: adminEmail, password: hashed, role: 'ADMIN' } });
          console.log('Admin user created on startup:', adminEmail);
        } else {
          console.log('Admin user already exists:', adminEmail);
        }
      }
    } catch (err) {
      console.error('Error creating admin on startup:', err);
    }
  })();
});
