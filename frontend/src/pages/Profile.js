import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

const Profile = () => {
  return (
    <div className='w-full flex flex-col'>
        <div className='w-[60%] mx-auto flex flex-col gap-4'>
        <FaArrowLeft size={24} />
        <div className='flex flex-col gap-2'>
            <h1 className='text-3xl font-extrabold'>Profile Settings</h1>
            <p className='text-md font-medium'>Manage your account information</p>
        </div>
        <div className='w-full self-center flex flex-col gap-3'>
             <div className='flex items-center gap-4'>
                 <IoPerson size={44} className='p-2 cursor-pointer rounded-full bg-black text-white' />
                 <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>User Name</h2>
                <p>username@gmail.com</p>
             </div>
             </div>
             
        </div>
        </div>
    </div>
  )
}

export default Profile
