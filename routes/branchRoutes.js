const express = require('express');
const { createBranch, getAllBranches, deleteBranch} = require('../controllers/branchController');

const router = express.Router();

// Route for creating a new branch
router.post('/', createBranch);

// Route for getting all branches
router.get('/', getAllBranches);

// Route to delete a branch by ID
router.delete('/:id', deleteBranch);

module.exports = router;