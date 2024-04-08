const User = require("../models/userModel");
const Note = require("../models/notesModel");
const SharedNotes = require("../models/sharedNotesModel");
const UserNotes = require("../models/userNotesModel");

// Route to create a new note
const createNote = async (req, res) => {
  try {
    const { content, title, username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const note = new Note({
      title,
      versions: [{ content, updateMessage: "Created blank note", modifiedBy: user._id }], // Initial version
      createdBy: user._id,
    });
    await note.save();

    await UserNotes.findOneAndUpdate(
      { user: user._id },
      { $push: { notes: note._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({ noteId: note._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to update a note
const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, updateMessage, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    note.title = title;
    note.versions.push({ content, updateMessage, modifiedBy: user._id });

    if (note.versions.length > 10) {
      note.versions.shift(); // Remove the oldest entry
    }

    await note.save();

    res.json({ message: "Successfully updated the note!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to delete a note by note ID
const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { username } = req.body;

    // Find the user using the provided username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the authenticated user is the owner of the note
    if (note.createdBy.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this note" });
    }

    // Delete the note
    await Note.findByIdAndDelete(noteId);

    // Remove the note from user's notes
    await UserNotes.findOneAndUpdate(
      { user: user._id },
      { $pull: { notes: noteId } }
    );

    // Remove the note from shared notes of other users
    await SharedNotes.findOneAndDelete({ note: noteId });

    // Remove the note from sharedNotes array in other users' UserNotes
    await UserNotes.updateMany(
      { sharedNotes: noteId },
      { $pull: { sharedNotes: noteId } }
    );

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to get all notes and shared notes by user ID using username
const getAllNotesByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch user notes and populate the 'notes' array
    const userNotes = await UserNotes.findOne({ user: user._id }).populate(
      "notes"
    );

    // Fetch user notes and populate the 'sharedNotes' array
    const sharedUserNotes = await UserNotes.findOne({
      user: user._id,
    }).populate("sharedNotes");

    // Extract the notes and sharedNotes arrays from the populated objects
    const notes = userNotes ? userNotes.notes : [];
    const sharedNotes = sharedUserNotes ? sharedUserNotes.sharedNotes : [];

    res.json({ notes, sharedNotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to get a note by note ID
const getNoteByNoteId = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to get a specific version of a note by note ID and version index
const getNoteByVersion = async (req, res) => {
  try {
    const { noteId, versionIndex } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const version = note.versions[versionIndex];

    if (!version) {
      return res.status(404).json({ error: "Version not found" });
    }

    res.json(version);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to get all versions of a note by note ID
const getAllNoteVersions = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId).populate({
      path: 'versions.modifiedBy',
      select: 'username'
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Map through versions to replace modifiedBy with username
    const versionsWithUsername = note.versions.map(version => ({
      content: version.content,
      updateMessage: version.updateMessage,
      modifiedBy: version.modifiedBy.username,
      modifiedAt: version.modifiedAt
    }));

    res.json(versionsWithUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to get collaborators by note ID
const getCollaboratorsByNoteId = async (req, res) => {
  try {
    const { noteId } = req.params;
    const sharedNote = await SharedNotes.findOne({ note: noteId }).populate({
      path: "sharedWith",
      select: "username email",
    });

    if (!sharedNote) {
      return res.status(404).json({ error: "Note not found or not shared" });
    }

    res.json({collaborators: sharedNote.sharedWith});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to add a collaborator to a note by email
const addCollaborator = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await SharedNotes.findOneAndUpdate(
      { note: noteId },
      { $addToSet: { sharedWith: user._id } },
      { new: true, upsert: true }
    );

    await UserNotes.findOneAndUpdate(
      { user: user._id },
      { $addToSet: { sharedNotes: noteId } },
      { new: true, upsert: true }
    );

    res.json({message: "Collaborated added."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Route to remove a collaborator from a note by username
const removeCollaborator = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await SharedNotes.findOneAndUpdate(
      { note: noteId },
      { $pull: { sharedWith: user._id } },
      { new: true }
    );

    await UserNotes.findOneAndUpdate(
      { user: user._id },
      { $pull: { sharedNotes: noteId } },
      { new: true }
    );

    res.json({ message: "Collaborator removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
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
};
