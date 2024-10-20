// attendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  totalClasses: { type: Number, required: true },
  classesAttended: { type: Number, required: true },
  period: { type: String, enum: ['15th', '30th'], required: true },
  month: { type: String, required: true },  
  year: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema); // Export the model
