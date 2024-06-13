"use client";
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
interface SettingModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    currentUser:User;
}


const SettingModal:React.FC<SettingModalProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {
    const router=useRouter();
    const [isLoading,setisLoading]=useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:currentUser?.name,
            image:currentUser?.image
        }
    });

    const image=watch('image');

    const handleUpload=(result:any)=>{
        setValue('image',result?.info?.secure_url,{
            shouldValidate:true
        })
    }

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setisLoading(true);
        axios.post("/api/settings",data)
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(()=>toast.error("Something went wrong!"))
        .finally(()=>setisLoading(false))
    };




  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
                Edit your public information
            </p>

            <div className='mt-10 flex flex-col gap-y-8'>
<Input
disabled={isLoading}
label='Name'
id='name'
errors={errors}
// required='true'
register={register}
/>
<div>
    <label className='block text-sm font-medium leading-6 text-gray-900' >
        Photo
    </label>
    <div className='mt-2 flex items-center gap-x-3'>
<Image  alt="Avatar" src={image || currentUser?.image || '/images/placeholder.png'} width={48} height={48} className='rounded-full'/>
<CldUploadButton
options={{maxFiles:1}}
onUpload={handleUpload}
uploadPreset="esuqpqlq"
>
<button
        disabled={isLoading}
        type='button'
        onClick={onClose}
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
            Change
        </button> 
      
</CldUploadButton>
    </div>
</div>
            </div>
            </div>
<div className='mt-6 flex items-center justify-end gap-x-6'>
<button
        disabled={isLoading}
        onClick={onClose}
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
            Cancel
        </button> 
<button
        disabled={isLoading}
        type='submit'
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
            Save
        </button> 
</div>
        </div>
    </form>
    </Modal>
)
}

export default SettingModal