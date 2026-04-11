const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/newsController');

const router = express.Router();

router.get('/', controller.getNews);
router.get('/:id', controller.getNewsById);
router.post('/', authenticateToken, upload.single('image'), controller.createNews);
router.put('/:id', authenticateToken, upload.single('image'), controller.updateNews);
router.delete('/:id', authenticateToken, controller.deleteNews);

module.exports = router;
