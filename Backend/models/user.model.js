import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  img:{
    type:String,
    required:false,
  },
  country:{
    type:String,
    required:false,
  },
  phone:{
    type:String,
    required:false,
  },
  isSeller:{
    type:Boolean,
    default:false,
    required:true,
  },
  desc:{
    type:String,
    required:false,
  },
},
{
    timestamps:true
});

const User=mongoose.model("User",userSchema);

export default User;