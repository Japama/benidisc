const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar los eventos.' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });
    if (!event) return res.status(404).json({ error: 'Evento no encontrado.' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el evento.' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    if (!title || !date || !location) return res.status(400).json({ error: 'Faltan campos requeridos.' });

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return res.status(400).json({ error: 'Fecha inválida.' });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: dateObj,
        location,
        imageUrl,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el evento.' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (date) {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return res.status(400).json({ error: 'Fecha inválida.' });
      data.date = dateObj;
    }
    if (location !== undefined) data.location = location;
    if (imageUrl) data.imageUrl = imageUrl;

    const updated = await prisma.event.update({ where: { id: Number(id) }, data });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el evento.' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({ where: { id: Number(id) } });
    res.json({ message: 'Evento eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el evento.' });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
