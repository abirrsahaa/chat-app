import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectToDb from "./db/connectToDb.js";
import addMsgToConversation from "./controllers/message.js";
import conversation from "./routes/getmessages.js"
import cors from "cors";


const app=express();
const server=createServer(app);

let userSocketMap = {};


dotenv.config();

const io=new Server(server,{
    cors:{
        allowedHeaders:["*"],
        origin:["http://localhost:3000","http://localhost:3001"]
    }
});

const port =process.env.PORT || 5000;
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000","http://localhost:3001"]
}));
app.use('/msg',conversation);

app.get("/",(req,res)=>{
    res.send("Welcome to Abir's new obsession!!");
})



io.on("connection",(socket)=>{
    console.log("the socket has been connected");
    // console.log("the socket  is",socket);
    const username = socket.handshake.query.username;
    console.log('Username:', username);

    // creating  a mapping
    userSocketMap[username] = socket;

    socket.on('chat msg',async (msg)=>{
        console.log("the message is",msg);

        console.log(msg.sender);
        console.log(msg.receiver);
        console.log(msg.text);

        const participants = [msg.sender, msg.receiver];
        await addMsgToConversation(participants, {
            text: msg.text,
            sender: msg.sender,
            receiver: msg.receiver
        });

        // !trying to create a one on one connection 
        const receiverSocket = userSocketMap[msg.receiver];
        if(receiverSocket){
            receiverSocket.emit('chat msg',msg);
        }

        // io.emit('chat message',msg); // this is done when we want everyone to get the message including the sender also 
        // socket.broadcast.emit('chat message',msg); // this is done when we want everyone to get the message except the sender
    })

    
})

server.listen(port,()=>{
    connectToDb();
    console.log(`the server is running on port ${port}`);
})