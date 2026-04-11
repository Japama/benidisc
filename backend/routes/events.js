const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/eventController');

const router = express.Router();

router.get('/', controller.getEvents);
router.get('/:id', controller.getEventById);
router.post('/', authenticateToken, upload.single('image'), controller.createEvent);
router.put('/:id', authenticateToken, upload.single('image'), controller.updateEvent);
router.delete('/:id', authenticateToken, controller.deleteEvent);

module.exports = router;
