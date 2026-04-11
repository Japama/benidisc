const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const controller = require('../controllers/trainingController');

const router = express.Router();

router.get('/', controller.getTrainings);
router.get('/:id', controller.getTrainingById);
router.post('/', authenticateToken, controller.createTraining);
router.put('/:id', authenticateToken, controller.updateTraining);
router.delete('/:id', authenticateToken, controller.deleteTraining);

module.exports = router;
