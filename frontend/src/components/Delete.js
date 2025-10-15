import axios from 'axios'
import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext'

const Delete = ({ id, setShowDeleteTask }) => {
  const [msg, setMsg] = useState('')
  const { url } = useContext(AppContext)
  const token = localStorage.getItem('token')

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200 || response.status === 201) {
        setMsg('Task Deleted')
        setTimeout(() => {
          setShowDeleteTask(false)
        }, 2000);
      } else {
        setMsg('Something Went Wrong')
      }
    } catch (error) {
      setMsg('Something Went Wrong')
      console.log('Delete error:', error)
    }
  }

  return (
    <div className='w-full h-[150px] bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
      <div className='p-2 max-w-[200px] max-h-[220px] rounded bg-white flex flex-col gap-3'>
        <p>Are you sure?</p>
        <div className='flex justify-center items-center gap-2'>
          <button onClick={() => setShowDeleteTask(false)} className='py-0.5 px-2 text-white bg-gray-400 text-md font-medium'>Cancel</button>
          <button onClick={handleDelete} className='py-0.5 px-2 text-white bg-red-400 text-md font-medium'>Delete</button>
        </div>
        {msg && <p className='text-md text-center text-gray-600'>{msg}</p>}
      </div>
    </div>
  )
}

export default Delete