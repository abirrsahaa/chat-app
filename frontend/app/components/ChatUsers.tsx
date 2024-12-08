import React, { useEffect } from 'react'
import { useUsersStore } from "../zustand/useUsersStore";
import { useAuthStore } from "../zustand/useAuthStore";
import { useChatReceiverStore } from "../zustand/useChatReceiverStore";
import axios from 'axios';
import useConversationStore from '../zustand/useConversationStore';


const ChatUsers = () => {


 const { users } =useUsersStore();
 const {authName}=useAuthStore();

 const {chatReceiver,updateChatReceiver}=useChatReceiverStore();

 const {updateConversation}=useConversationStore();

 console.log("the chat receiver is",chatReceiver);
 console.log("the auth name is",authName);

 const setting= (user)=>{
  updateChatReceiver(user.username);
 }

 useEffect(()=>{
  const getting=async()=>{
    const res=await axios.get("http://localhost:8083/msg",{
      params:{
        sender:authName,
        receiver:chatReceiver
      },
      withCredentials:true
    });
    console.log("the response from getting here is",res.data);
    if(res?.data.length>0){
      updateConversation(res.data);
    }else{
      updateConversation([]);
    }
  }
  if(chatReceiver)getting();
 },[chatReceiver])




 return (
   <div>
     {users.map((user, index) => (
    user.username !== authName ? (
      <div key={index} onClick={()=>setting(user)} className='bg-slate-400 rounded-xl m-3 p-5'>
        {user.username}
      </div>
    ) : null
  ))}
   </div>
 )
}


export default ChatUsers;