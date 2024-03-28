const mongoose = require('mongoose');

const userNotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

module.exports = mongoose.model('UserNotes', userNotesSchema);