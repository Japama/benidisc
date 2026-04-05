const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTournaments = async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany({ orderBy: { date: 'desc' } });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar los torneos.' });
  }
};

const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({ where: { id: Number(id) } });
    if (!tournament) return res.status(404).json({ error: 'Torneo no encontrado.' });
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el torneo.' });
  }
};

const createTournament = async (req, res) => {
  try {
    const { name, description, date, location, result, isFuture } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const tournament = await prisma.tournament.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        result,
        isFuture: isFuture === 'true' || isFuture === true,
        imageUrl,
      },
    });

    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el torneo.' });
  }
};

const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, location, result, isFuture } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await prisma.tournament.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        date: date ? new Date(date) : undefined,
        location,
        result,
        isFuture: isFuture === 'true' || isFuture === true,
        ...(imageUrl ? { imageUrl } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el torneo.' });
  }
};

const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tournament.delete({ where: { id: Number(id) } });
    res.json({ message: 'Torneo eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el torneo.' });
  }
};

module.exports = {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
};
