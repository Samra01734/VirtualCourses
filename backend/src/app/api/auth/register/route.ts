import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        await connectDb()
  const{name,email,password}=await req.json()
   const existUser=await User.findOne({email})
   if(existUser){
    return NextResponse.json(
        {message:"email  already exist!" },
       {status:400}
    )

   }

   if(password.length<6){
    return NextResponse.json(
        {message:"Password must be at least 6 characters" },
       {status:400}
    )

   }

    
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashedPassword
        })
         return NextResponse.json(
        {message:`register error  ${Error}`},
       {status:200}
    )
}

    catch(error){

    }
}
//conect db
//name, email,pasword
//email check
//password 6 char   jo h bs usko set kro ,, aur kch add nhi kro bs jo h uski  