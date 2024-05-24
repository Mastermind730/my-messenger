import { PrismaClient } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";

const prisma=new PrismaClient();

const getConversationId=async (
    conversationId:string
)=>{
    try{
const currentUser=await getCurrentUser();

if(!currentUser?.email){
    return null;
}
const conversation=await prisma.conversation.findUnique({
    where:{id:conversationId},
    include:{
        users:true
    }
});

return conversation;


    }catch(error:any){
        return null;

    }
}

export default  getConversationId;