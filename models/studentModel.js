const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },  // Unique for each student
  name: { type: String, required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  currentYear: { type: Number, required: true },          // Current year (1, 2, 3, 4)
  currentSemester: { type: Number, required: true },      // Current semester (1-8)
  section: { type: String, required: true },              // e.g., "A", "B"
  history: [                                              // Tracks promotion history
    {
      year: { type: Number, required: true },
      semester: { type: Number, required: true },
      section: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);