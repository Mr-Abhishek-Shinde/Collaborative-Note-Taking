const express = require('express');
const { 
    createNote,
    updateNote,
    getAllNotesByUserId,
    getNoteByNoteId,
    getCollaboratorsByNoteId,
    addCollaborator,
    removeCollaborator,
 }  = require('../controllers/notesController');
  
const router = express.Router();

router.post('/createNote', createNote);
router.put('/updateNote/:noteId', updateNote);

router.get('/getAllNotes/:userId', getAllNotesByUserId);
router.get('/getNote/:noteId', getNoteByNoteId);

router.post('/addCollaborator/:noteId', addCollaborator);
router.delete('/removeCollaborator/:noteId', removeCollaborator);
router.get('/getCollaborators/:noteId', getCollaboratorsByNoteId);

module.exports = router;