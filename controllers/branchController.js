const Branch = require('../models/branchModel');

// Create a new branch
exports.createBranch = async (req, res) => {
  try {
    const { name, year } = req.body;
    const newBranch = new Branch({ name, year });
    await newBranch.save();
    res.status(201).json({ message: 'Branch created successfully', newBranch });
  } catch (error) {
    res.status(500).json({ message: 'Error creating branch', error: error.message });
  }
};

// Get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving branches', error: error.message });
  }
};

// Delete a branch by ID
exports.deleteBranch = async (req, res) => {
  const { id } = req.params; // Get the branch ID from the URL parameters
  try {
    const deletedBranch = await Branch.findByIdAndDelete(id); // Find and delete the branch
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(200).json({ message: 'Branch deleted successfully', deletedBranch });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting branch', error: error.message });
  }
};