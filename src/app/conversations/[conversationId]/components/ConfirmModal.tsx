"use client";
import Modal from '@/app/components/Modal';
import useConversation from '@/app/hooks/useConversation';
import { DialogTitle } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { TbAlertTriangle } from "react-icons/tb";

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
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className='sm:flex sm:items-start'>
<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 '>
<TbAlertTriangle  className='h-6 w-6 text-red-600'/>

</div>
<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
<DialogTitle as='h3' className="text-base font-semibold leading-6 text-gray-900">
Delete Conversation
</DialogTitle>
<div className='mt-2'>
<p className='text-sm text-gray-500'>
    Are you sure you want to delete this conversation? This action cannot be undone
</p>
</div>
</div>
        </div>
        <div className='mt-5  sm:mt-4 sm:flex sm:flex-row-reverse'>
        <button
        disabled={isLoading}
        
        onClick={onDelete}
          className="bg-red-500 text-white font-bold mx-1 py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
            Delete
        </button> 
        <button
        disabled={isLoading}
        
        onClick={onClose}
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
            Cancel
        </button> 
        </div>
        </Modal>
  )
}

export default ConfirmModal