import express from "express";
import dotenv from "dotenv";
import cors from "cors";
;
import cookieParser from "cookie-parser";

import auth from "./routes/auth.router.js"
import users from "./routes/user.router.js"
import connectToDb from "./db/db.js";


const app=express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000","http://localhost:3001"]
}));
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use("/auth",auth);
app.use("/getting",users);

app.get("/",(req,res)=>{
    res.send("Welcome to Abir's authorization !!");
})

const port=process.env.PORT || 5001;

app.listen(port,()=>{
    connectToDb();
    console.log(`the auth server is running on port ${port}`);
})