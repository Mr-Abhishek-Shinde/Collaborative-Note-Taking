const express = require('express');
const { createOrUpdateNote, getAllNotesByUser, addUserToNote }  = require('../controllers/notesController');

const router = express.Router();

router.post('/createOrUpdateNote', createOrUpdateNote);
router.get('/getAllNotesByUser', getAllNotesByUser);
router.post('/addUserToNote',addUserToNote);


module.exports = router;