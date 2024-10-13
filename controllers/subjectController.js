const Subject = require('../models/subjectModel');

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error)
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({},{ __v:0});
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id,{ __v:0});
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subject
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(204).json(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
