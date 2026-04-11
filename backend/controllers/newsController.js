const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar las novedades.' });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.news.findUnique({ where: { id: Number(id) } });
    if (!item) return res.status(404).json({ error: 'Novedad no encontrada.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la novedad.' });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const news = await prisma.news.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la novedad.' });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (imageUrl) data.imageUrl = imageUrl;

    const updated = await prisma.news.update({ where: { id: Number(id) }, data });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la novedad.' });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id: Number(id) } });
    res.json({ message: 'Novedad eliminada.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la novedad.' });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
