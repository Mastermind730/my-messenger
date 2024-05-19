import { PrismaClient } from "@prisma/client";
import getSession from "./getSession";


const prisma=new PrismaClient();
const getCurrentUser=async ()=>{
    try {
        const session=await getSession();
        console.log(session);
        if(!session?.user?.email){
            return null;
        }

        const currentUser=await prisma.user.findUnique({
            where:{
                email:session.user.email as string
            }
        })
        if(!currentUser){
            return session.user;
        }
        return currentUser;


    } catch (error:any) {
        return null;

    }
}

export default getCurrentUser;