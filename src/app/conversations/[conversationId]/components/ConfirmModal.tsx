"use client";
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
interface ConfirmModalProps{
    isOpen?:boolean;
    onClose:()=>void;
}


const ConfirmModal:React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {
    const router=useRouter();
    const{conversationId}=useConversation();
    const [isLoading,setisLoading]=useState(false);

    const onDelete=useCallback(()=>{
        setisLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(()=>{
            onClose();
            router.push("/conversations");
            router.refresh();
        })
        .catch(()=>toast.error("Something went wrong!"))
        .finally(()=>setisLoading(false))
    },[conversationId,router,onClose]);

  return (

    <div>ConfirmModal</div>
  )
}

export default ConfirmModal