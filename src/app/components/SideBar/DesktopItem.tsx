"use client";
import React from 'react'
import clsx from 'clsx';
import Link from 'next/link';


interface DesktopItemProps{
  label:string;
  icon:any;
  href:string;
  onclick?:()=>void;
  active?:boolean;


}
const DesktopItem:React.FC<DesktopItemProps> = ({
  label,
  icon,
  href,
  onclick,
  active
}) => {
  return (
    <div>DesktopItem</div>
  )
}

export default DesktopItem