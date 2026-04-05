const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/sponsorController');

const router = express.Router();

router.get('/', controller.getSponsors);
router.get('/:id', controller.getSponsorById);
router.post('/', authenticateToken, upload.single('image'), controller.createSponsor);
router.put('/:id', authenticateToken, upload.single('image'), controller.updateSponsor);
router.delete('/:id', authenticateToken, controller.deleteSponsor);

module.exports = router;
