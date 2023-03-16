const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  profilePicture:{
    type:String,
  },
  coverPicture:{
    type:String,
  },
  followers:{
    type:Array,
  },
  followings:{
    type:Array,
  },
    isAdmin:{
    type:Boolean,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  city:{
    type:String,
  },
  from:{
    type:String,
  },
  desc:{
    type:String,
  },
  relationship:{
    type:Number,
  },
  token: {
    type: String,
  }
},
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
