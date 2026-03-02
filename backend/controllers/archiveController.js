const fs = require('fs');
const Archive = require('../models/Archive');
const Entry = require('../models/Entry');
const parseWhatsApp = require('../utils/parser');
const { encrypt, decrypt } = require('../utils/encryption');

const uploadArchive = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const rawText = fs.readFileSync(req.file.path, 'utf-8');
    const parsedEntries = parseWhatsApp(rawText);

    const archive = await Archive.create({
      name: req.body.name || req.file.originalname,
      user: req.user._id,
      totalEntries: parsedEntries.length
    });

    const entriesToSave = parsedEntries.map(entry => ({
      ...entry,
      archive: archive._id,
      content: encrypt(entry.content)
    }));

    await Entry.insertMany(entriesToSave);
    fs.unlinkSync(req.file.path); // Delete temp file

    res.status(201).json(archive);
  } catch (error) {
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: 'Error processing archive' });
  }
};

const getArchives = async (req, res) => {
  const archives = await Archive.find({ user: req.user._id }).sort('-createdAt');
  res.json(archives);
};

const getArchiveEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ archive: req.params.id }).sort('createdAt');
    const decryptedEntries = entries.map(entry => ({
      ...entry._doc,
      content: decrypt(entry.content)
    }));
    res.json(decryptedEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries' });
  }
};
const renameArchive = async (req, res) => {
  try {
    const archive = await Archive.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name: req.body.name },
      { new: true }
    );
    res.json(archive);
  } catch (error) {
    res.status(500).json({ message: 'Error renaming archive' });
  }
};

const deleteArchive = async (req, res) => {
  try {
    await Archive.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    await Entry.deleteMany({ archive: req.params.id }); // Clears encrypted messages
    res.json({ message: 'Archive deleted securely' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting archive' });
  }
};

module.exports = { uploadArchive, getArchives, getArchiveEntries, renameArchive, deleteArchive };