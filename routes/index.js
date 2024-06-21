const express = require('express')
const router = express.Router()



const MentorRoutes = require('./mentor')
const StudentRoutes = require("./student")


router.use('/',MentorRoutes)
router.use("/",StudentRoutes)


module.exports = router