import jwt from "jsonwebtoken";

const verifyjwt=(req,res,next)=>{
   try {

    console.log("the req cookies received is ",req.cookies);
    const token=req.cookies.jwt;
    console.log("the token received is ",token);
    if(!token){
        return res.status(401).json({message:"Unauthorized access"});
    }
    const verified=jwt.verify(token,process.env.JWT_SECRET);
    if(verified){
        console.log("the verified user is ",verified);
        next();
    }else{
        return res.status(401).json({message:"Unauthorized access"});
    }
    
   } catch (error) {
         console.log("the error was generated while verifying jwt ",error);
    
   }
}
export default verifyjwt;