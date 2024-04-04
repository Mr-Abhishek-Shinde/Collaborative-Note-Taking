const Message = require('../models/messageModel');

// Controller function to save a message to MongoDB
const saveMessage = async (req, res) => {
  try {
    const { noteId, user, text } = req.body;
    const message = new Message({ noteId, user, text });
    await message.save();
    res.json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to save message' });
  }
};

// Controller function to fetch messages for a specific room from MongoDB
const getMessagesByNoteId = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const messages = await Message.find({ noteId }).sort({ createdAt: 'asc' });
    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
};


module.exports = {
    saveMessage,
    getMessagesByNoteId,
  };