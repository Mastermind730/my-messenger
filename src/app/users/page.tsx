"use client";
import { signOut } from 'next-auth/react';
import React from 'react'

const page = () => {
  return (
    <div>Hello Users

        <button className='mx-5' onClick={()=>{signOut()}}>LogOut</button>
    </div>
  )
}

export default page;