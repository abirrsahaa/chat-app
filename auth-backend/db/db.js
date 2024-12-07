import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url=process.env.DB_URL;
console.log("the type of url is",typeof(url));  

const connectToDb=async ()=>{
    if(url){
       try {
        await mongoose.connect(url,{
             useNewUrlParser:true,
             useUnifiedTopology:true,
         
         });
         console.log("the db is connected");
       } catch (error) {
        console.log("the error is while connecting to db",error);
       }
    }
    else{
        console.log("the url is not present");
    }
}

export default connectToDb;