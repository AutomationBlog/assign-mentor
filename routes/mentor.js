const express = require('express')
const MentorController = require("../controller/mentor")

const router = express.Router();

//API to create Mentor
router.post("/mentor",MentorController.createMentor)

//API to get all mentors
router.get("/mentor",MentorController.getMentors)

//API to filter the mentor using ID
router.get("/mentor/:id",MentorController.getMentorByid)

//API to get students list of particular mentor using id
router.get("/studentslist/:id",MentorController.getstudentslist)





module.exports = router