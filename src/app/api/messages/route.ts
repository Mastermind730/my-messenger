import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(
    request:Request
){
try {
    const currentUser=await getCurrentUser();
    const body=await request.json();
    const{
        message,
        image,
        conversationId
    }=body;
    // console.log(body);
    if(!currentUser?.id || !currentUser?.email){
        return new NextResponse("UnAuthorised",{status:401})
    }

    const newMessage=await prisma.message.create({
        data:{
            body:message,
            image:image,
            conversation:{
                connect:{
                    id:conversationId
                }
            },
            sender:{
                connect:{
                    id:currentUser.id
                }
            },
            seen:{
                connect:{
                    id:currentUser.id
                }
            }
        },
        include:{
            seen:true,
            sender:true,
        }
    });

    const updateConeversation =await prisma.conversation.update({
        where:{
            id:conversationId
        },
        data:{
            lastMessageAt:new Date(),
            messages:{
                connect:{
                    id:newMessage.id
                }
            }
        },
        include:{
            users:true,
            messages:{
                include:{
                    seen:true
                }
            }
        }
    });

    await pusherServer.trigger(conversationId,"messages:new",newMessage);

    const lastMessage=updateConeversation.messages[updateConeversation.messages.length-1];

    updateConeversation.users.map((user)=>{
pusherServer.trigger(user.email!,"conversation:update",{
    id:conversationId,
    messages:[lastMessage]
})
});


    return NextResponse.json(newMessage);

} catch (error:any) {
    console.log(error,"ERROR Messages")
    return new NextResponse("Internal Server Error",{status:500})
}
}