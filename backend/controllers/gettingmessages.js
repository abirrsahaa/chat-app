import Conversation from "../models/conversation.js";

const gettingmessages=async(req,res)=>{
    try {

        console.log(" i got called in gettingmsg")

        // conversation return karna hai right toh pehle sender aur receiver ko bulao 
        const {sender,receiver}=req.query;

        console.log("the sender is",sender);
        console.log("the receiver is",receiver);

        const participants=[sender,receiver];
        // find conversation by participants
        const conversation =await Conversation.findOne({users:{$all:participants}});
        if(!conversation){
            console.log("no conversation has been found");

            return res.status(404).json({message:"no conversation has been found"});
           
            // console.log("the new conversation is",newConversation);
            // await newConversation.save();
        }
        console.log("the conversation is",conversation);
        return res.json(conversation.msgs);
        
    } catch (error) {

        console.log("the error is in the backend of chat while getting messages/fetching the conversation",error);
        return res.status(500).json({message:"the error is in the backend of chat while getting messages/fetching the conversation"});
        
    }
}

export default gettingmessages;