const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/achievementController');

const router = express.Router();

router.get('/', controller.getAchievements);
router.get('/:id', controller.getAchievementById);
router.post('/', authenticateToken, upload.single('image'), controller.createAchievement);
router.put('/:id', authenticateToken, upload.single('image'), controller.updateAchievement);
router.delete('/:id', authenticateToken, controller.deleteAchievement);

module.exports = router;
