const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get students by branch, year, semester, and section
router.get('/', studentController.getFilteredStudents);

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get a single student by roll number
router.get('/:rollNo', studentController.getStudentByRollNo);

// Update a student
router.put('/:rollNo', studentController.updateStudent);

// Delete a student
router.delete('/:rollNo', studentController.deleteStudent);

module.exports = router;