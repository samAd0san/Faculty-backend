const express = require('express');
const { createBranch, getAllBranches, deleteBranch, getBranchByName} = require('../controllers/branchController');

const router = express.Router();

// Route to get a branch by name
// endpoint --> http://localhost:3000/api/students?branch=67081e994fb8e12d2bd7a0ce&year=2&semester=1&section=A
router.get('/name', getBranchByName);

// Route for creating a new branch
router.post('/', createBranch);

// Route for getting all branches
router.get('/', getAllBranches);

// Route to delete a branch by ID
router.delete('/:id', deleteBranch);

module.exports = router;