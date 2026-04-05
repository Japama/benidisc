const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/tournamentController');

const router = express.Router();

router.get('/', controller.getTournaments);
router.get('/:id', controller.getTournamentById);
router.post('/', authenticateToken, upload.single('image'), controller.createTournament);
router.put('/:id', authenticateToken, upload.single('image'), controller.updateTournament);
router.delete('/:id', authenticateToken, controller.deleteTournament);

module.exports = router;
