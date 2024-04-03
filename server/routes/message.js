const express = require('express');
const { 
    saveMessage,
    getMessagesByNoteId,
 }  = require('../controllers/messageController');
  
const router = express.Router();

router.post('/saveMessage', saveMessage);
router.get('/getMessages/:noteId', getMessagesByNoteId);

module.exports = router;