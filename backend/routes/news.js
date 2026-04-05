const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/newsController');

const router = express.Router();

router.get('/', controller.getNews);
router.post('/', authenticateToken, upload.single('image'), controller.createNews);

module.exports = router;
