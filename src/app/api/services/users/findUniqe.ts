import prisma from "@/lib/prisma.client"

export async function findUniqeByEmail ( {email}: {email: string} ){
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function FindUniqeById({id}:{id: string}) {
    
    return await prisma.user.findUnique({
            where:{
                id
            }
        })
   
    
}