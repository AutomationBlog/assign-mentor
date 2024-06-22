const mentorModel = require("../models/mentor");

// API to create a new mentor
const createMentor = async (req, res) => {
  try {
    let mentor = await mentorModel.findOne({ email: req.body.email });

    if (!mentor) {
      await mentorModel.create(req.body);
      res.status(201).send({
        message: "Mentor created successfully",
      });
    } else {
      res.status(400).send({
        message: `Mentor with ${req.body.email} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// API to get all mentors
const getMentors = async (req, res) => {
  try {
    let mentors = await mentorModel.find();

    res.status(200).send({
      message: "Mentors are displayed here",
      mentors,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// API to get a mentor by ID
const getMentorByid = async (req, res) => {
  try {
    const id = req.params.id;
    const mentor = await mentorModel.findById(id);
    if (mentor) {
      res.send({
        message: "Data is fetched successfully",
        mentor: mentor,
      });
    } else {
      res.status(404).send({
        message: "Mentor not found. Invalid ID.",
      });
    }
  } catch (error) {
    console.error("Error:", error);

    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// API to get the list of students for a particular mentor
const getstudentslist = async (req, res) => {
  try {
    const id = req.params.id;
    const mentor = await mentorModel.findById(id);

    const list = mentor.students;

    res.status(200).send({
      message: "Students List are displayed here",
      studentslist: list,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getMentors,
  getMentorByid,
  createMentor,
  getstudentslist,
};
