import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register= async(req,res,next)=>{
    try{
       const hash=bcrypt.hashSync(req.body.password,5);
       const newUser= new User({
         ...req.body,
         password:hash,
       });
       
       await newUser.save();
       res.status(201).send("User has been created");
       }
       catch(err)
       {
       next(err);
       }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const err=new Error();
    err.status=404;
    err.message="USer not found";

    if (!user) {
    return next(createError(404,"User not found"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
   
    if (!isCorrect) {
    return next(createError(400,"Wrong username or password"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    };

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, cookieOptions)
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };

  res
    .clearCookie("accessToken", cookieOptions)
    .status(200)
    .send("User has been logged out.");
};