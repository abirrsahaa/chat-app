import { Schema } from "mongoose";


const chatMsg=new Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    // not necessary to have receiver
    receiver: {
        type: String,
        required: true
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
 
});


// const Chat=mongoose.model('Chat',chatMsg);
export default chatMsg;