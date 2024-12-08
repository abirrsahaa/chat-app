import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url=process.env.DB_URL;

const connectToDb=async ()=>{
    console.log("i am connecting to the db from the backend of chat");
    try {

        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        
            
        });

        console.log("the db has been connected from the backend of chat");

        
    } catch (error) {

        console.log("the error is in the backend of chat while connecting to db",error)
        
    }
}

export default connectToDb;