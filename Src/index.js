import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "../routes/user.routes.js";
dotenv.config();
const app=express();
app.use(express.json());

const PORT=process.env.PORT;
app.listen(PORT,async ()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log("Successfully Connected");
    }
    catch(e){
        console.log("Error while Connecting to mongodb ",e);
        
    }
});

app.get("/",(req,res,next)=>{
    res.send("Hello World");
});

app.use("/auth",userRouter);