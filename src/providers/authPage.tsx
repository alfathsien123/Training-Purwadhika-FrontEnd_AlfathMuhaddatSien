'use client'

import authStore from "@/zustand/authStore"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

    const rolePageAdmin = ['/dashboard']
    const rolePageManager = ['/dashboard', "/dashboard/order"]

export default function AuthPage({children}: Readonly<{children: React.ReactNode;}>){
    const router = useRouter()
    const pathName = usePathname()
    const role = authStore((state)=>state.role)
    console.log(role);
    


    // useEffect(()=>{
    //     if(role === 'ADMIN' && rolePageAdmin.includes(pathName)){
    //         // Render children if role is ADMIN and path is in rolePageAdmin
            
    //         router.push('/auth/login');
    //     }
    //     if(role === 'MANAGER' && rolePageManager.includes(pathName)){
    //         // Render children if role is MANAGER and path is in rolePageManager
        
    //         router.push('/auth/login');
    //     }
    //     // Redirect or handle unauthorized access here
    //     router.push('/unauthorized');
    // }, [children, pathName, role, router])

    

    if(role === 'ADMIN' && !rolePageAdmin.includes(pathName)){
        return (
            <div>
                <h1>This page is not accessible with your role</h1>
                <button onClick={()=>router.push("/auth/login")} className="btn">Login</button>
            </div>
    )
    }
    if(role === 'MANAGER' && !rolePageManager.includes(pathName)){
        return (
            <div>
                <h1>This page is not accessible with your role</h1>
                <button onClick={()=>router.push("/auth/login")} className="btn">Login</button>
            </div>
    )

    }

    if (!role || role == "USER")  {
        return (
            <div>
                <h1>This page is not accessible with your role</h1>
                <button onClick={()=>router.push("/auth/login")} className="btn">Login</button>
            </div>
    )
    } 
    

    return(
        <>
            {children}
        </>
    )

}