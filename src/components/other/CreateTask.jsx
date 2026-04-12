import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    // This is the updated submitHandler that fixes the bug
    const submitHandler = (e) => {
        e.preventDefault()

        const taskDetails = { taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false }
        const data = [...userData]

        let employeeFound = false;
        data.forEach(function (elem) {
            if (asignTo === elem.firstName) {
                elem.tasks.push(taskDetails)
                elem.taskCounts.newTask = elem.taskCounts.newTask + 1
                employeeFound = true;
            }
        })

        if (!employeeFound) {
            // FIRE ERROR TOAST
            window.dispatchEvent(new CustomEvent('show-notification', { 
                detail: { message: `Operative "${asignTo}" not found in database.`, type: 'error' } 
            }));
            return;
        }
        
        setUserData(data)
        localStorage.setItem('employees', JSON.stringify(data))

        // FIRE SUCCESS TOAST
        window.dispatchEvent(new CustomEvent('show-notification', { 
            detail: { message: `Task deployed successfully to ${asignTo}.`, type: 'success' } 
        }));

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
    }
    return (
        <div className='bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 mt-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between gap-6'>
                <div className='w-1/2 flex flex-col space-y-4'>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Task Title</h3>
                        <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-600' type="text" placeholder='e.g., UI Redesign' />
                    </div>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Date</h3>
                        <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-gray-400' type="date" />
                    </div>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Assign To</h3>
                        <input value={asignTo} onChange={(e) => setAsignTo(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-600' type="text" placeholder='Employee First Name' />
                    </div>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Category</h3>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-600' type="text" placeholder='Design, Dev, etc.' />
                    </div>
                </div>

                <div className='flex-1 flex flex-col'>
                    <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Description</h3>
                    <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required
                        className='w-full h-56 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none placeholder:text-gray-600' placeholder='Detailed task instructions...'></textarea>
                    
                    <button className='group relative w-full mt-6 overflow-hidden rounded-xl'>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-[length:200%_auto] animate-gradient"></div>
                        <div className="relative flex items-center justify-center px-8 py-4 bg-black/40 text-white font-bold text-sm tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-300 group-hover:bg-transparent group-active:scale-[0.98]">
                            Deploy Task
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask