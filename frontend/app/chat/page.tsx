'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";


const Chat=()=>{


    const [msg,setMsg]=useState('');
    const [msgs,setMsgs]=useState([]);
    const [dusre,setdusre]=useState([]);
    const [Socket,setSocket]=useState(null);

    const sendMsg=(e)=>{
        e.preventDefault();

        if(Socket){
            Socket.emit('chat message',msg);
            setMsgs(prevMsgs => [...prevMsgs, msg]);
            setMsg('');
        }

    }
    useEffect(()=>{
        const kuch=async()=>{
            const res=await axios.get("http://localhost:8081/getting/user");
            console.log("the response is to get all the users",res);
        }
        kuch();
    },[])

    useEffect(()=> {
        const socket=io('http://localhost:8080');

        if(socket){
            console.log('connected from client');
            setSocket(socket);

            socket.on('chat message',(msg)=>{
                console.log("this message is being received in frontend",msg);
                setdusre(prevMsgs => [...prevMsgs, msg]);
            })
        }

        return ()=>socket.close();
    },[]);
    return (
        <div className='h-screen flex flex-col'>
            <div className='msgs-container h-4/5 overflow-scroll'>
                {msgs.map((msg, index) => (
                    <div key={index} className="m-5 text-right">
                        {msg}
                    </div>
                ))}
                {dusre.map((msg, index) => (
                    <div key={index} className="m-5 text-left">
                        {msg}
                    </div>))}
            </div>
            <div className='h-1/5 flex items-center justify-center'>
                <form onSubmit={sendMsg} className="w-1/2"> 
                    <div className="relative"> 
                        <input type="text"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Type your text here"
                                required
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                        <button type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )
}
      

export default Chat;