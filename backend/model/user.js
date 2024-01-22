const mongoose = require("mongoose");
const { string } = require("zod");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require:true,
    unique: true,
    trim:true,
    lowercase:true,
    maxLength:30,
    minLength:3
  },
  password:{
    type:String,
    required:true,
    minLength:6
  },
  firstName:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
  },
  lastname:{
    type:String,
    require:true,
    trim:true,
    maxLength:50
  }
});

const User = mongoose.model("user", UserSchema);

module.exports  =User