const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalEntries: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Archive', archiveSchema);