"use client";

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
interface GroupChatModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    users:User[]
}
const GroupChatModal:React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {
    const router=useRouter();
    const [isLoading,setisLoading]=useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:'',
            members:[]
        }
    });

    const members=watch('members');
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setisLoading(true);

        axios.post("/api/conversations",{
            ...data,
            isGroup:true
        })
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(()=>toast.error("Something went wrong!"))
        .finally(()=>setisLoading(false))
    }
  return (
    <Modal 
    isOpen={isOpen}
    onClose={onClose}
    >
<form >
    
</form>
    </Modal>
)
}

export default GroupChatModal