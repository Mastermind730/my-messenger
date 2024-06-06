"use client";
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React from 'react'


interface MessageBoxProps{
    data:FullMessageType;
    isLast?:boolean;
}

const MessageBox:React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
  const session=useSession();
  const isOwn=session?.data?.user?.email===data?.sender?.email;
  const seenList=(data.seen || [])
  .filter((user)=>user.email!==data?.sender?.email)
  .map((user)=>user.name)
  .join(', ');

  const container=clsx(
    "flex gap-2 p-4",
    isOwn&& "justify-end"
  );

  const avatar=clsx(isOwn&& "order-2");

  const body=clsx(
    ""
  )

  return (
    <div>MessageBox</div>
  )
}

export default MessageBox;