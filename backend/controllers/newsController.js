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

module.exports = {
  getNews,
  createNews,
};
