"use client";
import React from 'react'
import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps{
    href:string;
    icon:any;
    active?:boolean;
    onclick?:()=>void;
}
const MobileItem:React.FC<MobileItemProps> = ({
    href,
    icon:Icon,
    active,
    onclick
}) => {
    const handleClick=()=>{
        if(onclick)
        return onclick();
    }

  return (
    <Link
    onClick={onclick}
    href={href}
    className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        loading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-blacl
        hover:bg-gray-100
    `,
    active && 'bg-gray-100 text-black'
)}
    >
        <Icon className='h-6 w-6' />
    </Link>
  )
}

export default MobileItem