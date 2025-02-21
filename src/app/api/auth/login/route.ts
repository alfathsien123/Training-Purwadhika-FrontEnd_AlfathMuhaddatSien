import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { findUniqeByEmail, FindUniqeById } from "@/app/api/services/users/findUniqe"
import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'


export async function POST(req:NextRequest){

    try{
        const { email, password} = await req.json()
    
       const findUser = await findUniqeByEmail({email});

        if(!findUser) throw {isShowError: true, message: "Account not found"}

        const isValidPass = await bcrypt.compare(password, findUser.password)

        if(!isValidPass) throw {isShowError: true, message: "Password invalid"}

        const token = await jwt.sign({id: findUser.id, role: findUser.role}, process.env.NEXT_PUBLIC_JWT_KEY!)
        
        // console.log(token);
        
        return NextResponse.json({
            message: "Login Success",
            data: {
                name: findUser.name,
                role: findUser.role,
                email: findUser.email,
                id: findUser.id,
                token
            }
        },
        {
            status: 200
        })

    } catch(error: unknown) {
        if((error as { isShowError: boolean })?.isShowError){
            return NextResponse.json(
                {message: (error as { message: string }).message},
                {status: 404}
            )
        } else {
            return NextResponse.json(
                {message: error instanceof Error ? error.message : "An unknown error occurred"},
                {status: 404}
            )
        }

    }
}

export async function GET(req:NextRequest) {
    try{
        const token = (await headers()).get('authorization')
        
        if(!token) throw {isShowError: true, message: 'Token must be provide'}
        
        const decodedToken: any = jwt.verify(token, `${process.env.NEXT_PUBLIC_JWT_KEY}`) // {id, role}

        const findUser = await FindUniqeById({id: decodedToken.id})

        if(!findUser) throw {isShowError: true, message: "Account not found"}

        return NextResponse.json({
            message: "Login Success",
            data: {
                name: findUser.name,
                role: findUser.role,
                email: findUser.email,
                id: findUser.id,
                token
            }
        },
        {
            status: 200
        })
        
    } catch(error) {
        if((error as { isShowError: boolean })?.isShowError){
            return NextResponse.json(
                {message: (error as { message: string }).message},
                {status: 404}
            )
        } else {
            return NextResponse.json(
                {message: error instanceof Error ? error.message : "An unknown error occurred"},
                {status: 404}
            )
        }
    }
}