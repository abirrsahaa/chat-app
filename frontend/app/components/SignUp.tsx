"use client";
import axios from "axios";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore";

const SignUp=()=>{

    const {updateAuthName}=useAuthStore();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    

    const signUpFunc = async (e) => {
        e.preventDefault();

       try {
         const res=await axios.post('http://localhost:8083/auth/signup',{username:username,password:password},{withCredentials:true});
         console.log("the response from signup is",res);
         if(res.data.message==="User already exists"){
            router.replace('/');
                alert("User already exists");

         }
         else{
            updateAuthName(username);
            router.replace('/chat');
         }
       } catch (error) {

        console.log("the error was received while signing up from frontend",error);
        
       }

    }

    const loginFunc = async (e) => {
        e.preventDefault();

       try {
         const res=await axios.post('http://localhost:8083/auth/login',{username:username,password:password},{withCredentials:true});
         console.log("the response from login is",res);
         if(res.data.message==="User does not exist"){
                router.replace('/');
                alert("User does not exist");
            } else if(res.data.message==="Invalid credentials"){
                router.replace('/');
                alert("Password is incorrect");
            }else{
            updateAuthName(username);
            router.replace('/chat');
            }

        }
        catch (error) {

            console.log("the error was received while logging in from frontend",error);
        }
        
    }
    
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input id="username"
                                    name="username"
                                    type="username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="username"
                                    required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password"
                                    className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                            </div>
                            <div className="mt-2">
                                <input id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" placeholder="current-password" required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className='flex'>
                            <button onClick={signUpFunc} type="submit" className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                            <button onClick={loginFunc} type="submit" className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>
                    </form>


                </div>
            </div>

        </div>
    )
}

export default SignUp;