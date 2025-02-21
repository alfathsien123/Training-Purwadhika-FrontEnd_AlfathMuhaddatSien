import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import  {headers} from 'next/headers'
import prisma from "@/lib/prisma.client";

export async function POST(req: NextRequest){
    try{
        const token = (await headers()).get('authorization')
        const {company, total, discount, tax, grandTotal, poItems} = await req.json()

        if (!token) throw{
            isShowError: true,
            message: 'Token must be provide'
        }
        
        const decodedToken: any = jwt.verify(token, `${process.env.NEXT_PUBLIC_JWT_KEY}`)

        console.log(decodedToken);
        
        
        if (decodedToken.role !== 'MANAGER') throw{
            isShowError: true,
            message: 'Unauthorize user'
        }

        await prisma.$transaction(async(tx)=>{
            const createdPO = await tx.purchaseOrder.create({
                data:{
                    poNumber: 'PO-xxx',
                    company,
                    status: 'DRAFT',
                    total,
                    discount,
                    tax,
                    grandTotal,
                    createdBy: decodedToken.id,
                    modifiedBy: decodedToken.id,
                }
            })
    
            // console.log(poItems);
            
    
            const modifiedPOItems = poItems.map((item : Array<object>)=>{
                return {...item, poId: createdPO.id}
            })
    
            await tx.purchaseOrderItem.createMany({
                data: modifiedPOItems
            })
        })

        return NextResponse.json({
            message: "Create PO Success"
        },{
            status: 201
        })

    } catch(err){
        console.log(err);
        
    }
}