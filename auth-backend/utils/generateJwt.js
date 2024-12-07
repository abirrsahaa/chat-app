import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret=process.env.JWT_SECRET;
console.log("the secret type is",typeof(secret));

const generateJwt = (userId,res) => {

    try {

        const token = jwt.sign({userId},secret,{expiresIn:"1h"});
        if(token){
            res.cookie("jwt", token, {
                maxAge: 15*24*60*60*1000, //miliseconds
                httpOnly: true,
                sameSite:"strict",
                secure: false
            })
        }
        
    } catch (error) {
        console.log("this error was generated while i was generating jwt",error);
    }

}

export default generateJwt;