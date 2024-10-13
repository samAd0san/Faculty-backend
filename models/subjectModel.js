const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // code: { type: String, required: true, unique: true }  // e.g., MATH101, PHYS102 
});

module.exports = mongoose.model('Subject', subjectSchema);