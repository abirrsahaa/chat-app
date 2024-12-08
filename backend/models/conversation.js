import mongoose, { Schema } from "mongoose";
import chatMsg from "./chat.js";


const conversation=new Schema({
    users: [{
        type: String,
        required: true
    }],
    msgs: [chatMsg]
 
});

const Conversation=mongoose.model('Conversation',conversation);
export default Conversation;