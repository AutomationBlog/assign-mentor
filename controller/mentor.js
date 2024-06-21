
const mentorModel = require("../models/mentor");


// API to create a new mentor
const createMentor = async (req, res) => {
  try {
    // Check if a mentor with the provided email already exists
    let mentor = await mentorModel.findOne({ email: req.body.email });

    // Check if the mentor already exists
    if (!mentor) {
      // Create a new mentor if not already exists
      await mentorModel.create(req.body);
      res.status(201).send({
        message: "Mentor created successfully",
      });
    } else {
      // Send an error response if the mentor already exists
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
    // Retrieve all mentors from the database
    let mentors = await mentorModel.find();

    // Send the list of mentors as a response
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
    // Retrieve a mentor by ID
    const mentor = await mentorModel.findById(id);

    // Check if the mentor is found
    if (mentor) {
      res.send({
        message: "Data is fetched successfully",
        mentor: mentor,
      });
    } else {
      // Send a 404 error response if the mentor is not found
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
    // Retrieve the mentor by ID
    const mentor = await mentorModel.findById(id);

    // Get the list of students from the mentor's data
    const list = mentor.students;

    // Send the list of students as a response
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
