"use client";
import axios from 'axios';
import React, { useEffect } from 'react'

const User= () => {
    useEffect(()=>{
        const kuch=async()=>{
            const res=await axios.get("http://localhost:8081/getting/user",{withCredentials:true});
            console.log("the response is to get all the users",res);
        }
        kuch();
    },[])
  return (
    <div>page</div>
  )
}

export default User;