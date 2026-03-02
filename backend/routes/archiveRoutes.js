const express = require('express');
const router = express.Router();
const { uploadArchive, getArchives, getArchiveEntries, renameArchive, deleteArchive } = require('../controllers/archiveController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('file'), uploadArchive);
router.get('/', protect, getArchives);
router.get('/:id', protect, getArchiveEntries);

router.put('/:id', protect, renameArchive);
router.delete('/:id', protect, deleteArchive);

module.exports = router;