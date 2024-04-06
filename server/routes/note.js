const express = require('express');
const { 
    createNote,
    updateNote,
    deleteNote,
    getAllNotesByUsername,
    getNoteByNoteId,
    getNoteByVersion,
    getAllNoteVersions,
    getCollaboratorsByNoteId,
    addCollaborator,
    removeCollaborator,
 }  = require('../controllers/notesController');
  
const router = express.Router();

router.post('/createNote', createNote);
router.put('/updateNote/:noteId', updateNote);
router.delete('/deleteNote/:noteId', deleteNote);

router.get('/getAllNotes/:username', getAllNotesByUsername);
router.get('/getNote/:noteId', getNoteByNoteId);

router.get('/getAllNoteVersions/:noteId', getAllNoteVersions);
router.get('/getNoteByVersion/:noteId/:versionIndex', getNoteByVersion);

router.post('/addCollaborator/:noteId', addCollaborator);
router.delete('/removeCollaborator/:noteId', removeCollaborator);
router.get('/getCollaborators/:noteId', getCollaboratorsByNoteId);

module.exports = router;