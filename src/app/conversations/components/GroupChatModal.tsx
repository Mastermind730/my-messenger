"use client";

import Input from '@/app/components/Input';
import Modal from '@/app/components/Modal';
import Select from '@/app/components/Select';
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
<form onSubmit={handleSubmit(onSubmit)}>
    <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
<h2 className='text-base font-semibold leading-7 text-gray-900'>
Create a group chat
</h2>
<p className='mt-1 text-sm leading-6 text-gray-600'>
    Create a chat with more than 2 people
</p>
<div className='mt-10 flex flex-col gap-y-8'>
<Input
register={register}
label='Name'
id='name'
disabled={isLoading}
required='true'
errors={errors}
/>
<Select
    disabled={isLoading}
    label="Members"
    options={users.map((user)=>({
        value:user.id,
        label:user.name
    }))}
    onChange={(value:any)=>setValue("members",value,{
        shouldValidate:true
    })}
    value={members}
/>
</div>
        </div>
    </div>
    <div className='mt-6 flex items-center justify-end gap-x-6'>
    <button
        disabled={isLoading}
        onClick={onClose}
        type='button'
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
            Cancel
        </button> 
<button
        disabled={isLoading}
        type='submit'
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
            Create
        </button> 
    </div>
</form>
    </Modal>
)
}

export default GroupChatModal