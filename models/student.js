const mongoose = require("./index")

validateEmail= (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const studentSchema = new mongoose.Schema({

    Name:{type:String,required:[true,"Name is required"]},
    email:{type:String,required:[true,"Email is required"],validate:validateEmail},
    role:{type:String,default:"student"},
    previousmentors: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mentor",
        },
      ],
    currentmentor:{type:mongoose.Schema.Types.ObjectId,ref:"mentor"}
},
{
    versionKey:false
})





const studentModel = mongoose.model('student',studentSchema)
module.exports = studentModel