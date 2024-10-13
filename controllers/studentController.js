const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');
const Subject = require('../models/subjectModel'); // Import Subject model

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, { __v: 0 }).populate('attendance'); // Populate attendance data
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by roll number
exports.getStudentByRollNo = async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo }).populate('attendance'); // Populate attendance data
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true } // Return the updated student
    ).populate('attendance'); // Populate attendance data

    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(204).json(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { student: studentId, subject: subjectId, totalClasses, classesAttended, period } = req.body;

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Check if the subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    const attendance = new Attendance({
      student: studentId,
      subject: subjectId,
      totalClasses,
      classesAttended,
      period
    });

    await attendance.save();
    
    // Add attendance to student's attendance array
    student.attendance.push(attendance._id);
    await student.save();

    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get attendance records for a specific student
// http://localhost:3000/api/students/attendance/2021001
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const student = await Student.findOne({ rollNo }).populate('attendance'); // Populate attendance data

    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    res.status(200).json(student.attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
    
    // Optionally, remove attendance ID from the associated student's attendance array
    await Student.updateOne(
      { _id: attendance.student },
      { $pull: { attendance: attendance._id } } // Remove the attendance record reference from the student
    );

    res.status(204).json(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get filtered students with attendance
exports.getFilteredStudentsWithAttendance = async (req, res) => {
  try {
    const { branch, year, semester, section, subjectId, period } = req.query;

    // Create a filter object to pass to MongoDB query
    const filter = {};
    if (branch) filter.branch = branch;
    if (year) filter.currentYear = year;
    if (semester) filter.currentSemester = semester;
    if (section) filter.section = section;

    // Fetch students with attendance records populated
    const students = await Student.find(filter)
      .populate({
        path: 'attendance',
        match: { subject: subjectId, period: period }  // Match attendance for subject and period (15th/30th)
      });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
