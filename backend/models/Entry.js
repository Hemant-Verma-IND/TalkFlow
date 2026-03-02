const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  archive: { type: mongoose.Schema.Types.ObjectId, ref: 'Archive', required: true },
  timestamp: { type: String },
  sender: { type: String },
  content: { type: String, required: true }, // This will be encrypted
  isSystem: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);