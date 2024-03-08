const express = require('express');
const {noteUser, uploadNotes} = require('../controllers/notesController');

const router = express.Router();
router.post('/note', noteUser);
router.get('/getnotes', uploadNotes);

module.exports = router;