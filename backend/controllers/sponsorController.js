const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSponsors = async (req, res) => {
  try {
    const sponsors = await prisma.sponsor.findMany({ orderBy: { order: 'asc' } });
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar los patrocinadores.' });
  }
};

const getSponsorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsor = await prisma.sponsor.findUnique({ where: { id: Number(id) } });
    if (!sponsor) return res.status(404).json({ error: 'Patrocinador no encontrado.' });
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el patrocinador.' });
  }
};

const createSponsor = async (req, res) => {
  try {
    const { name, website, order } = req.body;
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const sponsor = await prisma.sponsor.create({
      data: {
        name,
        website,
        order: order ? Number(order) : 0,
        logoUrl,
      },
    });

    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el patrocinador.' });
  }
};

const updateSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, website, order } = req.body;
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await prisma.sponsor.update({
      where: { id: Number(id) },
      data: {
        name,
        website,
        order: order ? Number(order) : undefined,
        ...(logoUrl ? { logoUrl } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el patrocinador.' });
  }
};

const deleteSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sponsor.delete({ where: { id: Number(id) } });
    res.json({ message: 'Patrocinador eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el patrocinador.' });
  }
};

module.exports = {
  getSponsors,
  getSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor,
};
