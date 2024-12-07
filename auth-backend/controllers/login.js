import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJwt from "../utils/generateJwt.js"


const login=async(req,res)=>{
    try {

        const {username,password}=req.body;

        // console.log("the req received is ",req);
        // console.log("the req body is ",req.body);

        // now that i have the details i will check if the user already exists or not
        const existing=await userModel.findOne({
            username:username
        })
        if(existing){
            const verifyPassword=await bcrypt.compare(password,existing.password);
            if(verifyPassword){
                generateJwt(existing._id,res);
                return res.status(200).json({message:"User logged in successfully"});
            }else{
                return res.status(400).json({message:"Invalid credentials"});
            }
        }else{
            return res.status(400).json({message:"User does not exist"});
        }
    } catch (error) {

        console.log("the error was generated while login from backend ",error);
        
    }
    // console.log("the signup is called");
};
export default login;