import { PrismaClient } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";

const prisma=new PrismaClient();
const getConversations=async ()=>{
    const currentUser=await getCurrentUser();
 

    if(!currentUser?.id){
        return [];
    }

    try{
        const conversations=await prisma.conversation.findMany({
            orderBy:{
                lastMessageAt:'desc'
            },
            where:{
                userIds:{
                    has:currentUser.id
                }
            },
            include:{
                users:true,
                messgages:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }
        }

        );
        return conversations;


    }catch(error:any){
            return [];
    }
}

export default getConversations;