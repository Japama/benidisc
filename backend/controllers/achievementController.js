const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAchievements = async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({ orderBy: { year: 'desc' } });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar los logros.' });
  }
};

const getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await prisma.achievement.findUnique({ where: { id: Number(id) } });
    if (!achievement) return res.status(404).json({ error: 'Logro no encontrado.' });
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el logro.' });
  }
};

const createAchievement = async (req, res) => {
  try {
    const { title, description, year, medal } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const achievement = await prisma.achievement.create({
      data: {
        title,
        description,
        year: Number(year),
        medal,
        imageUrl,
      },
    });

    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el logro.' });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, year, medal } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await prisma.achievement.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        year: year ? Number(year) : undefined,
        medal,
        ...(imageUrl ? { imageUrl } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el logro.' });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id: Number(id) } });
    res.json({ message: 'Logro eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el logro.' });
  }
};

module.exports = {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
