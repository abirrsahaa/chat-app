import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";


const app=express();
const server=createServer(app);


dotenv.config();

const io=new Server(server,{
    cors:{
        allowedHeaders:["*"],
        origin:"*"
    }
});

const port =process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("Welcome to Abir's new obsession!!");
})

io.on("connection",(socket)=>{
    console.log("the socket has been connected");
    console.log("the socket  is",socket);

    socket.on('chat message',(msg)=>{
        console.log("the message is",msg);

        // io.emit('chat message',msg); // this is done when we want everyone to get the message including the sender also 
        socket.broadcast.emit('chat message',msg); // this is done when we want everyone to get the message except the sender
    })

    
})

server.listen(port,()=>{
    console.log(`the server is running on port ${port}`);
})