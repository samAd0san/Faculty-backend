const express = require('express');
const router = express.Router();
const { addMarks, getMarks, updateMarks } = require('../controllers/marksController');

// Add/Update Marks
router.post('/', addMarks);

// Update Marks (PUT)
router.put('/:subject_id/:examType/:id', updateMarks); // Use id to identify the marks entry

// Get Marks for a Subject and Exam Type
router.get('/:subject_id/:examType', getMarks);

module.exports = router;