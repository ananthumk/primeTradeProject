import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Profile = () => {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: ''
  })
  const [changePassword, setChangePassword] = useState(false)
  const [msg, setMsg] = useState('')
  const { url } = useContext(AppContext)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // Fetch user info and populate form
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200 || response.status === 201) {
        setForm(prevForm => ({
          ...prevForm,
          name: response.data.name || '',
          email: response.data.email || ''
        }))
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  const handleFormToggle = () => {
    setShowForm(prev => !prev)
    setMsg('')
  }

  const handlePasswordToggle = () => {
    setChangePassword(prev => !prev)
    setMsg('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }

  const handleCancel = () => {
    setShowForm(false)
    setChangePassword(false)
    setMsg('')
    fetchData() 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
  
      
      

      const response = await axios.put(`${url}/user/`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200 || response.status === 201) {
        setMsg('Profile updated successfully')
        setShowForm(false)
        setChangePassword(false)
        fetchData() 
      } else {
        setMsg('Failed to update profile')
      }
    } catch (error) {
      console.error('Update error:', error)
      setMsg('Failed to update profile')
    }
  }

  return (
    <div className='w-full min-h-[100vh] flex flex-col p-5 md:pt-20'>
      <div className='w-[85%] md:w-[60%] mx-auto flex flex-col gap-4'>
        <FaArrowLeft onClick={() => navigate('/')} size={24} className='cursor-pointer' />
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-extrabold'>Profile Settings</h1>
          <p className='text-md font-medium'>Manage your account information</p>
        </div>
        <div className='w-full self-center border border-gray-500 p-2 md:py-4 md:px-4 flex flex-col md:flex-row justify-between gap-3'>
          <div className='flex  items-center gap-4'>
            <IoPerson size={44} className='p-2 cursor-pointer rounded-full bg-black text-white' />
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold'>{form.name || 'User Name'}</h2>
              <p>{form.email || 'username@gmail.com'}</p>
            </div>
          </div>
          <button onClick={handleFormToggle} 
            className='py-2 max-h-[50px] rounded cursor-pointer px-4 max-w-[250px] text-md bg-blue-500 font-medium text-white'>
            {showForm ? 'Close' : 'Edit User Details'}
          </button>
        </div>
        {showForm && (
          <div className='w-full bg-slate-200 rounded'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-2'>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col gap-1'>
                  <label className='text-md font-medium'>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className='border border-gray-300 w-full py-1 px-3'
                    required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-md font-medium'>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className='border border-gray-300 w-full py-1 px-3'
                    required
                  />
                </div>
              </div>

              <p onClick={handlePasswordToggle} className='text-md font-medium text-blue-400 cursor-pointer hover:underline'>
                {changePassword ? 'Cancel Password Change?' : 'Change Password?'}
              </p>

              {changePassword && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-md font-medium'>Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={form.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Enter old password"
                      className='border border-gray-300 w-full py-1 px-3'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-md font-medium'>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className='border border-gray-300 w-full py-1 px-3'
                      required
                    />
                  </div>
                </div>
              )}

              {msg && <p className='text-center text-red-600'>{msg}</p>}

              <div className='flex items-center justify-end gap-3'>
                <button type='submit' className='max-w-[140px] bg-blue-400 cursor-pointer text-white text-md font-medium py-1 px-2 rounded'>
                  Save Changes
                </button>
                <button type='button' onClick={handleCancel} 
                  className='max-w-[140px] bg-gray-700 cursor-pointer text-white text-md font-medium py-1 px-2 rounded'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
