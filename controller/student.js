
const studentModel = require("../models/student");
const mentorModel = require("../models/mentor");

// API to create a new student
const createStudent = async (req, res) => {
  try {
    // Check if a student with the provided email already exists
    let student = await studentModel.findOne({ email: req.body.email });

    // Condition to check existing student
    if (!student) {
      // Create a new student if not already exists
      await studentModel.create(req.body);
      res.status(201).send({
        message: "Student created successfully",
      });
    } else {
      // Send an error response if the student already exists
      res.status(400).send({
        message: `Student with ${req.body.email} already exists`,
      });
    }
  } catch (error) {
   
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// API to get all students
const getStudent = async (req, res) => {
  try {
    // Retrieve all students from the database
    let studentdetails = await studentModel.find();

    // Check if there are any students
    if (studentdetails.length > 0) {
      res.status(200).send({
        message: "Students are displayed here",
        studentdetails,
      });
    }
  } catch (error) {
   
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// API to get a student by ID
const getStudentByid = async (req, res) => {
  try {
    const id = req.params.id;
    // Retrieve a student by ID
    const student = await studentModel.findById(id);

    // Check if the student is found
    if (student) {
      res.send({
        message: "Data is fetched successfully",
        student: student,
      });
    } else {
      // Send a 404 error response if the student is not found
      res.status(404).send({
        message: "Student not found. Invalid ID.",
      });
    }
  } catch (error) {
   
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// API to assign a student to a mentor
const assignmentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    // Find the student and mentor by their IDs
    const student = await studentModel.findOne({ _id: studentId });
    const mentor = await mentorModel.findOne({ _id: mentorId });

    // Check if the student has already been assigned a mentor
    const existingAssignment = await studentModel.findOne({
      mentor: studentId,
      currentmentor: { $exists: true },
    });

    // Check if both the student and mentor exist and the assignment is valid
    if (student && mentor && !existingAssignment) {
      // Add the student to the mentor's students list
      mentor.students.push(studentId);

      // Set the mentor as the student's current mentor
      student.currentmentor = mentorId;

      // Save changes to the database
      await mentor.save();
      await student.save();

      // Send a success response with details
      res.status(201).send({
        message: `Student ${student.Name} assigned to mentor ${mentor.Name} successfully`,
        student: student,
      });
    } else {
      // Send an error response if the assignment fails
      res.status(400).send({
        message: existingAssignment
          ? "Student is already assigned to a mentor"
          : "Invalid student or mentor information",
      });
    }
  } catch (error) {
   
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// API to assign or change a mentor for a particular student
const updatementor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    // Find the student and mentor by their IDs
    const student = await studentModel.findOne({ _id: studentId });
    const mentor = await mentorModel.findOne({ _id: mentorId });

    // Check if both the student and mentor exist
    if (student && mentor) {
      // Check if the provided mentor is already the current mentor of the student
      if (String(student.currentmentor) === String(mentor._id)) {
        return res.status(400).send({
          message: "Student is already assigned to the provided mentor",
        });
      }

      // Find the previous mentor of the student and update the mentor arrays
      const previousMentor = await mentorModel.findOne({ students: studentId });
      if (previousMentor) {
        previousMentor.students.pull(studentId);
        await previousMentor.save();
        student.previousmentors.push(previousMentor._id);
      }

      // Set the provided mentor as the current mentor of the student
      student.currentmentor = mentorId;

      // Add the student to the new mentor's students list
      mentor.students.push(studentId);

      // Save changes to the database
      await mentor.save();
      await student.save();

      // Send a success response with details
      res.status(201).send({
        message: `Student ${student.Name} updated to mentor ${mentor.Name} successfully`,
        student: student,
      });
    } else {
      // Send an error response if the update fails
      res.status(400).send({
        message: "Invalid student or mentor information",
      });
    }
  } catch (error) {
    
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// API to show the previously assigned mentors for a particular student
const mentorslist = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the student by ID
    const student = await studentModel.findById(id);

    // Get the list of previous mentors from the student's data
    const list = student.previousmentors;

    // Send the list of previous mentors as a response
    res.status(200).send({
      message: `Previous Mentors List of ${student.Name} are displayed here`,
      mentorslist: list,
    });
  } catch (error) {
   
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
};


module.exports = {
  createStudent,
  getStudent,
  getStudentByid,
  assignmentor,
  updatementor,
  mentorslist
}