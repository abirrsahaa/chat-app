'use client'


import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthStore } from "../zustand/useAuthStore";
import axios from "axios";
import { useUsersStore } from "../zustand/useUsersStore";
import ChatUsers from "../components/ChatUsers";
import { useChatReceiverStore } from "../zustand/useChatReceiverStore";
import { useRouter } from "next/navigation";
import useConversationStore from "../zustand/useConversationStore";




const Chat=()=>{

    const router=useRouter();


    const {authName}=useAuthStore();

    

    // const {chatReceiver}=useChatReceiverStore();

    const {updateUsers}=useUsersStore();


    const [msg,setMsg]=useState('');
    const [msgs,setMsgs]=useState([]);
    const [dusre,setdusre]=useState([]);
    const [Socket,setSocket]=useState(null);

    const {conversation,updateConversation}=useConversationStore();

    console.log("the conversation is",conversation);

    const chatReceiver = useChatReceiverStore(state => state.chatReceiver);

    if(authName=='')router.replace('/');
    useEffect(()=>{

        const getting=async()=>{
            const res=await axios.get("http://localhost:8083/getting/user",{withCredentials:true});
            console.log("the response from getting is",res.data);
            updateUsers(res.data);
            
        }
        getting();
    },[]);
    useEffect(()=> {
        const socket=io('http://localhost:8083',{
            query:{
                username:authName
            }
        });

        if(socket){
            console.log('connected from client');
            setSocket(socket);

            

            socket.on('chat msg',(msg)=>{
              
                console.log("this message is being received in frontend",msg);
                //here things are getting overwritten for some reason
                const naya=[...conversation,msg];
                updateConversation(naya);
                console.log("the updated conversation is",conversation);
            })
        }

        return ()=>socket.close();
    },[]);


    const sendMsg=(e)=>{
        e.preventDefault();

        const msgToBeSent = {
            text: msg,
            sender: authName,
            receiver: chatReceiver
        };


        if(Socket) {
            Socket.emit("chat msg", msgToBeSent);           
            updateConversation([...conversation, msgToBeSent]);
            setMsg('');
        }


    }


   
    

   

    return (
        <div className='h-screen flex divide-x-4 relative'>
            <div className='w-1/5 '>
                <ChatUsers/>
            </div>
            <div className='w-4/5 flex flex-col'>
                <div className='1/5'>
                    <h1>
                        {authName} is chatting with {chatReceiver}
                    </h1>
                </div>
                <div className='msgs-container h-3/5 overflow-scroll'>
                    {conversation.length>0?(conversation?.map((msg, index) => (
                        <div key={index} className={`m-3 p-1 ${msg.sender === authName ? 'text-right' : 'text-left'}`}>
                            <span className={`p-2 rounded-2xl ${msg.sender === authName ? 'bg-blue-200' : 'bg-green-200'}`}>
                            {msg.text}
                            </span>
                        </div>
                    ))):null}
                </div>
                <div className='h-1/5 flex items-center justify-center '>
                    <form onSubmit={sendMsg} className="w-1/2 absolute bottom-1"> 
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
       </div>
     )
}
      

export default Chat;