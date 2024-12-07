import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJwt from "../utils/generateJwt.js"


const signup=async(req,res)=>{
    try {

        const {username,password}=req.body;

        // console.log("the req received is ",req);
        // console.log("the req body is ",req.body);

        // now that i have the details i will check if the user already exists or not
        const existing=await userModel.findOne({
            username:username
        })
        if(existing){
            res.status(400).json({
                message:"User already exists"
            })
        }else{
            const hashed=await bcrypt.hash(password,12);
            const user=new userModel({
                username:username,
                password:hashed
            });
            // idhar cookie banale 
            // pehle jwt generate kar 
            generateJwt(user._id,res);
            console.log("the new user created is",user);
            await user.save();
            return res.status(201).json({message: "User registered!"});
        }
        
    } catch (error) {

        console.log("the error was generated while signing up from backend ",error);
        
    }
    // console.log("the signup is called");
};
export default signup;