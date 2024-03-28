const Note = require("../models/notesModel");

// Route to create new or update existing note:
const createOrUpdateNote = async (req, res) => {
  const { time, blocks, version, email, noteName } = req.body;

  try {
    const note = await Note.createOrUpdateNote(
      time,
      blocks,
      version,
      email,
      noteName
    );

    res.status(200).json({ time, blocks, version, email, noteName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Route to get all notes of particular user
const getAllNotesByUser = async (req, res) => {
  const { email } = req.query;

  try {
    const uploadnotes = await Note.getAllNotesByUser(email);

    res.json({ uploadnotes });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", error: err.message });
  }
};

const addUserToNote = async (req, res) => {
  const { email, noteName } = req.body;

  try {
    const detail = await Note.addUserToNote(email, noteName);

    res.status(200).json({ email, noteName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { 
  createOrUpdateNote, 
  getAllNotesByUser, 
  addUserToNote,
};
