import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import connectDB from './config/db.js';
dotenv.config();
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.routes.js";
import gigRoute from "./routes/gig.route.js";
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
//import messagesRoute from "./routes/messages.route.js";
const app=express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages",messageRoute);
//app.use("/api/messages", messagesRoute);
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
  
    res.status(status).json({
        success: false,
        message,
    });
});



app.get("/",(req,res)=>{
    res.send("Api is running");
});

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});
connectDB();
