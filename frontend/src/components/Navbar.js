import React, { useState } from 'react'
import { SiTask } from "react-icons/si";
import { IoPerson } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showPopUp, setShowPopup] = useState(false)
  const handlePopup = () => {
    setShowPopup(prevState => !prevState)
  }
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className='w-full h-[10vh] shadow shadow-black py-2 flex justify-between px-10 items-center'>
      <div className='flex gap-2 items-center'>
        <SiTask size={34} />
        <h2 className='text-2xl font-bold text-black'>Task Manager</h2>
      </div>
      <IoPerson size={44} onClick={handlePopup} className='p-2 cursor-pointer rounded-full bg-black text-white relative' />
      {showPopUp &&
        <div className='absolute right-0 top-12 bg-white shadow-md rounded-md py-2 flex flex-col min-w-[120px]'>
          <p onClick={() => navigate('/profile')} className='px-4 py-1 hover:bg-gray-100 cursor-pointer'>Profile</p>
          <p onClick={handleLogout} className='flex items-center gap-2 px-4 py-1 hover:bg-gray-100 cursor-pointer'>
            <TbLogout size={20} /> Logout
          </p>
        </div>
      }
    </div>
  )
}

export default Navbar
