const mongoose = require("./index");

validateEmail = (e) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

const mentorSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "Name is required"] },
    email: {type: String,  required: [true, "Email is required"],  validate: validateEmail,  },
    role: { type: String, default: "mentor" },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    
  },
  {
    versionKey: false,
  }
);

const mentorModel = mongoose.model("mentor", mentorSchema);
module.exports = mentorModel;
