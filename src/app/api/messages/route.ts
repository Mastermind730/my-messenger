import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";


export async function post(
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

    if(!currentUser?.id || !currentUser?.email){
        return new NextResponse("UnAuthorised",{status:401})
    }

    const newMessage=await prisma

} catch (error:any) {
    console.log(error,"ERROR Messages")
    return new NextResponse("Internal Server Error",{status:500})
}
}