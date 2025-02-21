'use client'
import axios from "axios";
import authStore from "@/zustand/authStore";
import { useEffect } from "react";


export default function AuthProvider({children} : Readonly<{
    children: React.ReactNode;
  }>){  
    const setAuth = authStore((state)=> state.setAuth)
    const token = authStore.getState().token

    const handleSessionAuth = async()=>{
        
        try{
            // console.log(token);
           const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, {
                headers: {
                    'authorization' : token
                }
            })
            setAuth({
                email: response.data.data.email,
                name: response.data.data.name,
                role: response.data.data.role,
                token: response.data.data.token,
            })
            console.log(response);
            
        } catch(error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        handleSessionAuth()
    },)

    return(
        <>
            {children}
        </>
    )
}