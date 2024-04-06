const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  content: {
    type: Object,
    required: true
  },
  updateMessage: {
    type: String,
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  versions: [versionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Note", noteSchema);
