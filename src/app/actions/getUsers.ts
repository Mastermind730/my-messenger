// import { PrismaClient } from "@prisma/client";
import getSession from "./getSession";
import prisma from "@/app/lib/prismadb";

// const prisma=new PrismaClient();
const getUsers=async ()=>{
    const session=await getSession();
    if(!session?.user?.email){
        return [];
    }
    try{
        const users=await prisma.user.findMany({
            orderBy:{
                createdAt:'desc',
            },
            where:{
                NOT:{
                    email:session.user.email,
                }
            }
        });
        return users;

    }catch(error:any){
return [];
    }
};

export default getUsers;
