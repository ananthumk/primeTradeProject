import axios from 'axios'
import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext'

const AddTask = ({setShowAddTask}) => {
  const [form, setForm] = useState({
    title: '', description: '', status: 'pending'
  })
  const [msg, setMsg] = useState('')
  const {url} = useContext(AppContext)
  const token = localStorage.getItem('token')
  const handleInput = (e) => {
     const {name, value} = e.target 
     setForm(prevState => ({
      ...prevState,
      [name]: value
     }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(url + '/task/', form, {
        headers: {

          Authorization: `Bearer ${token}`
        }
      } )

      if(response.status === 200 || response.status === 201){
          setMsg('Task Added Successfully')
          setTimeout(() => {
            setShowAddTask(false)
          },2000);
          
      }
    } catch (error) {
         setMsg('Something went Wrong! Try again later')
    }
  }
  return ( 
    <div className='w-full py-2 px-3 flex flex-col border border-gray-500  gap-3'>
        <h3>Add New Task </h3>
        <form onSubmit={handleSubmit} className=''>
            <div className='flex flex-col gap-1'>
                <label>Title*</label>
                <input type="text" placeholder='Enter Task Title' onChange={handleInput} name="title" value={form.title}
                 className='w-full py-1 px-2 rounded border border-gray-500 text-md text-gray-500' required/>
            </div>
              <div className='flex flex-col gap-1'>
                <label>Description</label>
                <input type="text" placeholder='Enter Task Description' onChange={handleInput} name="description" value={form.description}
                 className='w-full py-1 px-2 rounded text-md border border-gray-500 text-gray-500' />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Status</label>
                <select onChange={handleInput} name="status" value={form.status} className='py-0.5 px-3 border border-gray-500 rounded max-w-[200px]'>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">completed</option>
                </select>
            </div>
            <div className='flex items-center justify-end gap-3'>
                <button onClick={() => setShowAddTask(false)} className='max-w-[200px] py-0.5 px-2 text-black bg-gray-200 rounded cursor-pointer text-md font-medium'>Cancel</button>
                <button type='submit' className='max-w-[200px] py-0.5 px-2 text-white bg-blue-400 rounded cursor-pointer text-md font-medium'>Add</button>
            </div>
        </form>
        {msg && <p className='text-center'>{msg}</p>}
    </div>
  )
}

export default AddTask
