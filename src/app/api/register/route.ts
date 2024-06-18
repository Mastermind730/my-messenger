import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


var prisma=new PrismaClient();

export  async function POST(req:Request){
    try{
    const body=await req.json();
    // console.log(body);
    const{name,email,password}=body;
    // console.log(name,email,password);

    if(!name ||!email ||!password){
        return new NextResponse("missing info",{status:400});
    }

    const hashedPassword=await bcrypt.hash(password,12);

    let user=await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    });
    // console.log("user is:")
    // console.log(user)

    return NextResponse.json(user);
    }catch(error:any){
        return new NextResponse("Internal Error",{status:500});
    }
}