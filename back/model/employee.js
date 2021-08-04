const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Phone: {
    type: String,
    required: true,
    unique: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  DOB:{
    type:Date,
    required:true
  },

  HighestQualification: {
    type: String,
    required: true,
  },
  SkillSet: {
    type: String,
  },

  State: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  Post: {
    type: String,
    required: true,
  },

  PinCode: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PassOfYear:{},
  CreationDate:{
    type:Date,
    
  }
});
// EmployeeSchema.statics.findAndValidate = async function (email, password) {
//   const foundUser = await this.findOne({ email,password });
//   if(foundUser){
//     return foundUser
//   } else {
//     return false
//   }
// }


module.exports = mongoose.model("Employee", EmployeeSchema);
