const express = require('express');
const {noteUser, uploadNotes, addUser}  = require('../controllers/notesController');

const router = express.Router();
router.post('/note', noteUser);
router.get('/getnotes', uploadNotes);
router.post('/addUser',addUser);


module.exports = router;