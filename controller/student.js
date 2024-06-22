const studentModel = require("../models/student");
const mentorModel = require("../models/mentor");

// API to create a new student
const createStudent = async (req, res) => {
  try {
    let student = await studentModel.findOne({ email: req.body.email });

    if (!student) {
      await studentModel.create(req.body);
      res.status(201).send({
        message: "Student created successfully",
      });
    } else {
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
    let studentdetails = await studentModel.find();

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
    const student = await studentModel.findById(id);

    if (student) {
      res.send({
        message: "Data is fetched successfully",
        student: student,
      });
    } else {
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

    const student = await studentModel.findOne({ _id: studentId });
    const mentor = await mentorModel.findOne({ _id: mentorId });

    const existingAssignment = await studentModel.findOne({
      mentor: studentId,
      currentmentor: { $exists: true },
    });

    if (student && mentor && !existingAssignment) {
      mentor.students.push(studentId);

      student.currentmentor = mentorId;

      await mentor.save();
      await student.save();

      res.status(201).send({
        message: `Student ${student.Name} assigned to mentor ${mentor.Name} successfully`,
        student: student,
      });
    } else {
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

    const student = await studentModel.findOne({ _id: studentId });
    const mentor = await mentorModel.findOne({ _id: mentorId });

    if (student && mentor) {
      if (String(student.currentmentor) === String(mentor._id)) {
        return res.status(400).send({
          message: "Student is already assigned to the provided mentor",
        });
      }

      const previousMentor = await mentorModel.findOne({ students: studentId });
      if (previousMentor) {
        previousMentor.students.pull(studentId);
        await previousMentor.save();
        student.previousmentors.push(previousMentor._id);
      }

      student.currentmentor = mentorId;

      mentor.students.push(studentId);

      await mentor.save();
      await student.save();

      res.status(201).send({
        message: `Student ${student.Name} updated to mentor ${mentor.Name} successfully`,
        student: student,
      });
    } else {
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
    const student = await studentModel.findById(id);

    const list = student.previousmentors;

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
  mentorslist,
};
