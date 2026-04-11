const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTrainings = async (req, res) => {
  try {
    const trainings = await prisma.trainingSchedule.findMany({ orderBy: { dayOfWeek: 'asc' } });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar los entrenamientos.' });
  }
};

const getTrainingById = async (req, res) => {
  try {
    const { id } = req.params;
    const training = await prisma.trainingSchedule.findUnique({ where: { id: Number(id) } });
    if (!training) return res.status(404).json({ error: 'Horario no encontrado.' });
    res.json(training);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el horario.' });
  }
};

const createTraining = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime, location, mapUrl, requirements } = req.body;
    if (!dayOfWeek || !startTime || !endTime || !location) return res.status(400).json({ error: 'Faltan campos requeridos.' });

    const training = await prisma.trainingSchedule.create({
      data: {
        dayOfWeek,
        startTime,
        endTime,
        location,
        mapUrl,
        requirements,
      },
    });

    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el horario de entrenamiento.' });
  }
};

const updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { dayOfWeek, startTime, endTime, location, mapUrl, requirements } = req.body;

    const data = {};
    if (dayOfWeek !== undefined) data.dayOfWeek = dayOfWeek;
    if (startTime !== undefined) data.startTime = startTime;
    if (endTime !== undefined) data.endTime = endTime;
    if (location !== undefined) data.location = location;
    if (mapUrl !== undefined) data.mapUrl = mapUrl;
    if (requirements !== undefined) data.requirements = requirements;

    const updated = await prisma.trainingSchedule.update({ where: { id: Number(id) }, data });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el horario.' });
  }
};

const deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.trainingSchedule.delete({ where: { id: Number(id) } });
    res.json({ message: 'Horario eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el horario.' });
  }
};

module.exports = {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
};
