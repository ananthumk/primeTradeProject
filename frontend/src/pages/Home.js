import React, { useContext, useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import Navbar from '../components/Navbar'
import { SiTicktick } from "react-icons/si"
import { GrInProgress } from "react-icons/gr"
import { MdPendingActions } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import AddTask from '../components/AddTask'
import AppContext from '../context/AppContext'
import axios from 'axios'
import Delete from '../components/Delete'
import EditTask from '../components/EditTask'

const urlStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL'
}

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)
  const [showDeleteTask, setShowDeleteTask] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [taskDetails, setTaskDetails] = useState([])
  const [status, setStatus] = useState(urlStatus.initial)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [pendingTasks, setPendingTasks] = useState(0)
  const [inProgressTasks, setInProgressTasks] = useState(0)
  const [errMsg, setErrMsg] = useState('')
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const { url } = useContext(AppContext)
  const token = localStorage.getItem('token')
  

  const fetchData = async () => {
      try {
        setStatus(urlStatus.inProgress)
        const response = await axios.get(`${url}/task/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const tasks = Array.isArray(response.data) ? response.data : (response.data.tasks || [])
        setTaskDetails(tasks)
        setErrMsg('')
        setStatus(urlStatus.success)

        const completedCount = tasks.filter(task => task.status === 'COMPLETED').length
        const inProgressCount = tasks.filter(task => task.status === 'IN_PROGRESS').length
        const pendingCount = tasks.filter(task => task.status === 'PENDING').length

        setCompletedTasks(completedCount)
        setInProgressTasks(inProgressCount)
        setPendingTasks(pendingCount)
      } catch (error) {
        setStatus(urlStatus.failure)
        console.log('home', error)
        setErrMsg('Something went wrong! Try again')
      }
    }
  useEffect(() => {
    
    fetchData()
  }, [url])

  const filteredTasks = taskDetails.filter(task => {
    if (category !== 'All' && task.status.toUpperCase() !== category.toUpperCase()) return false
    if (searchText.trim() !== '' && !task.title.toLowerCase().includes(searchText.toLowerCase())) return false
    return true
  })

  return (
    <div className='w-full min-h-[100vh]'>
      <Navbar />
      <div className='w-[90%] sm:w-[95%] mx-auto flex flex-col pt-5 gap-5'>
        {/* Welcome Header */}
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl sm:text-3xl font-semibold'>Welcome Back</h1>
          <p className='text-lg p-0 text-neutral-700'>Add task and complete it on time</p>
        </div>

        {/* Status Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6'>
          {/* Completed Tasks */}
          <div className='w-full py-3 px-7 shadow-lg flex items-center gap-4 bg-white rounded-sm'>
            <SiTicktick size={44} className='text-green-600 bg-green-200 p-2' />
            <div className='flex flex-col justify-center'>
              <p className='text-md'>Completed Tasks</p>
              <h3 className='text-xl font-semibold'>{completedTasks}</h3>
            </div>
          </div>
          {/* In Progress Tasks */}
          <div className='w-full py-3 px-7 shadow-lg flex items-center gap-4 bg-white rounded-sm'>
            <GrInProgress size={44} className='text-yellow-600 bg-yellow-200 p-2' />
            <div className='flex flex-col justify-center'>
              <p className='text-md'>In Progress Tasks</p>
              <h3 className='text-xl font-semibold'>{inProgressTasks}</h3>
            </div>
          </div>
          {/* Pending Tasks */}
          <div className='w-full py-3 px-7 shadow-lg flex items-center gap-4 bg-white rounded-sm'>
            <MdPendingActions size={44} className='text-blue-600 bg-blue-200 p-2' />
            <div className='flex flex-col justify-center'>
              <p className='text-md'>Pending Tasks</p>
              <h3 className='text-xl font-semibold'>{pendingTasks}</h3>
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className='w-full bg-white rounded-md shadow-lg'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center px-10 py-4 gap-3'>
            <h5 className='text-md font-medium'>Task Management</h5>
            <button onClick={() => setShowAddTask(true)} className='py-1 px-2 bg-blue-500 text-white rounded cursor-pointer text-md font-medium'> + Add New Task</button>
          </div>

          {/* Filters and Search */}
          <div className='px-10 py-3 flex flex-col sm:flex-row justify-between items-center gap-4'>
            {/* Search Input */}
            <div className='flex items-center gap-3 flex-1 border-2 border-gray-400 rounded-md px-4 py-2'>
              <IoIosSearch size={24} className='text-muted-foreground' />
              <input
                type="search"
                placeholder="Search by name"
                className='w-full bg-transparent border-0 outline-none text-sm'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            {/* Category Buttons */}
            <div className='flex flex-wrap gap-2'>
              {['All', 'COMPLETED', 'IN_PROGRESS', 'PENDING'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-0.5 px-3 rounded-sm font-medium text-md whitespace-nowrap ${
                    category === cat ? 'bg-blue-500 text-white' : 'bg-slate-300 text-black'
                  }`}
                >
                  {cat === 'COMPLETED' ? 'Completed' : cat === 'IN_PROGRESS' ? 'In Progress' : cat === 'PENDING' ? 'Pending' : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Add Task Modal */}
          {showAddTask && (
            <div className='px-10 py-3'>
              <AddTask setShowAddTask={setShowAddTask} />
            </div>
          )}

          {/* Loader */}
          {status === urlStatus.inProgress && (
            <div className='flex justify-center items-center h-64'>
              <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
          )}

          {/* Task List */}
          {status === urlStatus.success && (
            <div className='px-10 py-6 space-y-3'>
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <div key={task.id} className='hover:bg-slate-100 cursor-pointer bg-white border rounded-lg p-3 flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                      <input type='checkbox' className='w-4 h-4' />
                      <div className='flex flex-col'>
                        <h2 className='text-sm sm:text-base font-semibold'>{task.title}</h2>
                        <p className='text-xs sm:text-sm text-gray-500'>{task.description}</p>
                        <div className={`w-fit py-1 px-3 rounded-full ${task.status === 'COMPLETED' ? 'bg-green-200' : task.status === 'IN_PROGRESS' ? 'bg-yellow-200' : 'bg-blue-200'}`}>
                          <span className='text-xs font-medium'>
                            {task.status === 'COMPLETED' ? 'Completed' : task.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button onClick={() => { setShowEditTask(true); setTaskId(task.id) }} className='p-2 rounded-md hover:bg-gray-200'>
                        <FaEdit className='text-gray-600' size={20} />
                      </button>
                      <button onClick={() => { setShowDeleteTask(true); setTaskId(task.id) }} className='p-2 rounded-md hover:bg-gray-200'>
                        <MdDelete className='text-gray-600' size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex justify-center py-12'>
                  <h2 className='text-lg text-gray-600'>No Task Found. Add Your Task</h2>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {status === urlStatus.failure && (
            <div className='px-10 py-12 flex justify-center items-center'>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='text-lg text-gray-600'>{errMsg}</h2>
                <button onClick={fetchData} className='py-0.5 px-2 bg-blue-500 text-white rounded'>
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Edit Task Modal */}
          {showEditTask && (
            <div className='px-10 py-3'>
            <EditTask id={taskId} setShowEditTask={setShowEditTask} /></div>
          )}

          {/* Delete Task Modal */}
          {showDeleteTask && (
            <div className='px-10 py-3'>
            <Delete id={taskId} setShowDeleteTask={setShowDeleteTask} /></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
