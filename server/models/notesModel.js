const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  blocks: {
    type: Array,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  }
});

module.exports = mongoose.model("Note", noteSchema);
