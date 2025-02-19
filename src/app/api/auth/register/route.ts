import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma.client"

export async function POST(req:NextRequest){

    try{
        const {name, email, password} = await req.json()
        const passwordHashed = await bcrypt.hash(password,10)
    
        const findUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(findUser) throw new Error ('Email Already Exist') 

        await prisma.user.create({
            data: {
                name,
                email,
                password : passwordHashed
            }
        })
        
        return NextResponse.json({
            message: "Register User Success"
        },
        {
            status: 201
        })

    } catch(error) {
        return NextResponse.json(
            {message: error instanceof Error ? error.message : "An unknown error occurred"},
            {status: 400}
        )
    }
}