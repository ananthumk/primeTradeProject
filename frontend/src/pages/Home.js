import React from 'react'
import Navbar from '../components/Navbar'
import { SiTicktick } from "react-icons/si";
import { GrInProgress } from "react-icons/gr";
import { MdPendingActions } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Home = () => {
  return (
    <div className='w-full min-h-[100vh]'>
       <Navbar />
       <div className='w-full min-h-[90vh] bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col pt-5 gap-5'>
            <div className='w-[95%] mx-auto flex flex-col gap-5'>
                {/* Welcome Header Section */}
                <div className='flex flex-col gap-1' >
                    <h1 className='text-2xl font-semibold'>Welcome Back, Abhi</h1>
                    <p className='text-lg p-0 text-neutral-700'>Add task and complete it on time</p>
                </div>

                {/* Task Status Container */}
                <div className='grid grid-cols-3 gap-5 '>
                    <div className='w-full py-3 px-7 shadow-lg flex items-center gap-4 bg-white rounded-sm'>
                        
                              <SiTicktick size={44} className='text-green-600 bg-green-200 p-2' />
                         
                         <div className='flex flex-col justify-center'>
                              <p className='text-md p-0'>Completed Tasks</p>
                              <h3 className='text-xl p-0 font-semibold'>4</h3>
                         </div>
                    </div>
                    <div className='w-full py-3 px-7 shadow-lg flex items-center gap-4 bg-white rounded-sm'>
                        
                              <GrInProgress size={44} className='text-yellow-600 bg-yellow-200 p-2' />
                         
                         <div className='flex flex-col justify-center'>
                              <p className='text-md p-0'>In Progress Tasks</p>
                              <h3 className='text-xl p-0 font-semibold'>2</h3>
                         </div>
                    </div>
                    <div className='w-full py-3 px-7 shadow-lg flex items-center gap-4 bg-white rounded-sm'>
                        
                              <MdPendingActions size={44} className='text-blue-600 bg-blue-200 p-2' />
                         
                         <div className='flex flex-col justify-center'>
                              <p className='text-md p-0'>Pending Tasks</p>
                              <h3 className='text-xl p-0 font-semibold'>6</h3>
                         </div>
                    </div>
                </div>

                {/* Tables */}
                <div className='w-full  bg-white rounded-md shadow-lg'>
                       <div className='flex justify-between items-center px-10 py-4'>
                           <h5 className='text-md font-medium'>Task Management</h5>
                           <button className='py-1 px-2 bg-blue-500 text-white cursor-pointer text-md font-medium'> + Add New Task</button>
                        </div>
                        <hr className='text-gray-700 w-full h-[20px]' />
                        <div className='flex justify-between items-center px-10 py-3'>
                            {/* Search container */}
                            <div className='flex  w-full items-center gap-5'>
                                <div className='flex items-center gap-4 w-[70%] bg-transparent border-2 py-0.5 px-5 border-gray-400 rounded-md'>
                                    <IoIosSearch size={26} className='text-gray-600' />
                                    <input type="search" placeholder='Search by name'
                                     className='w-full border-0 outline-none text-md text-gray-600' />
                                </div>
                                <button className='py-0.5 px-3 rounded-sm text-white font-medium text-md bg-blue-500'>
                                    All
                                </button>
                                <button className='py-0.5 px-3 rounded-sm text-black font-medium text-md bg-slate-300'>
                                    Completed
                                </button>
                                <button className='py-0.5 px-3 rounded-sm text-black font-medium text-md bg-slate-300'>
                                    In Progess
                                </button>
                                <button className='py-0.5 px-3 rounded-sm text-black font-medium text-md bg-slate-300'>
                                    Pending
                                </button>
                            </div>
                              
                        </div>
                        {/* Task Details */}
                        <div className='px-10 py-3 flex flex-col gap-4'>
                            <div className='hover:bg-slate-100 cursor-pointer bg-transparent border rounded flex justify-between border-gray-500 p-2'>
                                <div className='flex gap-3'>
                                    <input type="checkbox" className='w-4 mt-2 h-4' />
                                    <div className='flex flex-col gap-1'>
                                         <h2 className='text-md font-medium'>Complete project documentation</h2>
                                         <p className='text-sm font-light text-gray-500'>Write comprehensive documentation for the new feature</p>
                                         <div className='bg-green-300 w-[90px] py-0.5 px-2 rounded-xl'>
                                             <p className='text-sm font-medium text-green-800'>Completed</p>
                                         </div>
                                    </div>
                                </div>
                                <div className='flex  gap-2'>
                                      <FaEdit size={20} className='text-gray-600 cursor-pointer hover:text-blue-500' />  
                                      <MdDelete size={20} className='text-gray-600 cursor-pointer hover:text-red-500' />    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Home
