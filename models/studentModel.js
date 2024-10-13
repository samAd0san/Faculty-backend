// studentModel.js
const mongoose = require('mongoose');
const Attendance = require('../models/attendanceModel'); // Import the attendance model

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  currentYear: { type: Number, required: true },
  currentSemester: { type: Number, required: true },
  section: { type: String, required: true },
  history: [
    {
      year: { type: Number, required: true },
      semester: { type: Number, required: true },
      section: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date }
    }
  ],
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],  // Reference to Attendance model
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);