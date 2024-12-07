import userModel from "../models/user.model.js";

const user=async(req,res)=>{
    console.log(" i was called")
    try {

        const users=await userModel.find({});

        console.log("the users are ",users);

        if(users.length>0){
            return res.status(200).json(users);
        }else{
            return res.status(400).json({message:"No users found"});
        }

        
    } catch (error) {
        console.log("the error was generated while fetching user from backend ",error);
        
    }

}

export default user;