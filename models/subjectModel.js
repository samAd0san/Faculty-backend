const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
});

module.exports = mongoose.model('Subject', subjectSchema);
