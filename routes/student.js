const express = require("express");
const StudentController = require("../controller/student");

const router = express.Router();

//API to create Student
router.post("/student", StudentController.createStudent);

//API to get all students created
router.get("/student", StudentController.getStudent);

//API to get students By Id
router.get("/student/:id", StudentController.getStudentByid);

//API to Assign a Mentor to Student
router.post("/assignmentor", StudentController.assignmentor);

//API to Assign or Change Mentor for particular Student
router.post("/updatementor", StudentController.updatementor);

//API to show the previously assigned mentors for a particular student
router.get("/mentorslist/:id", StudentController.mentorslist);

module.exports = router;
