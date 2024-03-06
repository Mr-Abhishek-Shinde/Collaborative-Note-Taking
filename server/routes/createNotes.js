const express = require('express');
const {noteUser} = require('../controllers/notesController');

const router = express.Router();
router.post('/note', noteUser);

module.exports = router;