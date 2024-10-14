const Marks = require("../models/marksModel");

// Add/Update Marks for a Single Student
exports.addMarks = async (req, res) => {
  const {
    student,
    subject,
    examType,
    marks,
    maxMarks,
    regulation,
    year,
    semester,
    section,
  } = req.body;

  try {
    // Find existing marks entry for the student, subject, and exam type
    let marksEntry = await Marks.findOne({ student, subject, examType });

    if (marksEntry) {
      // Update existing marks
      marksEntry.marks = marks;
      marksEntry.maxMarks = maxMarks; // Optionally update maxMarks if required
      marksEntry.regulation = regulation;
      marksEntry.year = year;
      marksEntry.semester = semester;
      marksEntry.section = section;
    } else {
      // Create new marks entry
      marksEntry = new Marks({
        student,
        subject,
        examType,
        marks,
        maxMarks,
        regulation,
        year,
        semester,
        section,
      });
    }

    // Save the marks entry to the database
    await marksEntry.save();

    res.status(200).json({ message: "Marks saved successfully", marksEntry });
  } catch (error) {
    console.error("Error saving marks:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error saving marks", error: error.message });
  }
};

// Get Marks for a specific subject and exam type
exports.getMarks = async (req, res) => {
  const { subject_id, examType } = req.params;

  try {
    // Fetch all marks for the given subject and exam type
    const marks = await Marks.find({ subject: subject_id, examType }).populate(
      "student",
      "name rollNo"
    );
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving marks", error });
  }
};

// Update Marks for a Specific Entry
exports.updateMarks = async (req, res) => {
  const { id } = req.params; // ID of the marks entry to update
  const { marks, maxMarks, regulation, year, semester, section } = req.body;

  try {
    // Find the marks entry by ID
    const marksEntry = await Marks.findById(id);
    if (!marksEntry) {
      return res.status(404).json({ message: "Marks entry not found" });
    }

    // Update the fields in the marks entry
    marksEntry.marks = marks || marksEntry.marks; // Only update if new value is provided
    marksEntry.maxMarks = maxMarks || marksEntry.maxMarks; // Only update if new value is provided
    marksEntry.regulation = regulation || marksEntry.regulation; // Only update if new value is provided
    marksEntry.year = year || marksEntry.year; // Only update if new value is provided
    marksEntry.semester = semester || marksEntry.semester; // Only update if new value is provided
    marksEntry.section = section || marksEntry.section; // Only update if new value is provided

    // Save the updated entry to the database
    await marksEntry.save();

    res.status(200).json({ message: "Marks updated successfully", marksEntry });
  } catch (error) {
    console.error("Error updating marks:", error);
    res
      .status(500)
      .json({ message: "Error updating marks", error: error.message });
  }
};
