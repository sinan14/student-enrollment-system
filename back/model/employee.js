const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob:{
    type:Date,
    required:true
  },

  highestQualification: {
    type: String,
    required: true,
  },
  skilSet: {
    type: String,
  },

  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },

  pinCode: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creationDate:{
    type:Date,
    
  }
});
EmployeeSchema.statics.findAndValidate = async function (email, password) {
  const foundUser = await this.findOne({ email,password });
  if(foundUser){
    return foundUser
  } else {
    return false
  }
}


module.exports = mongoose.model("Employee", EmployeeSchema);
