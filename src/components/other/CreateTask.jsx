import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

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
            window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Operative "${asignTo}" not found in database.`, type: 'error' } }));
            return;
        }
        
        setUserData(data)
        updateDoc(doc(db, "ems", "companyData"), { employees: data })
        
        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Task deployed successfully to ${asignTo}.`, type: 'success' } }));

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
    }

    return (
        <div className='mt-8 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-6 sm:p-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
            <h2 className='flex items-center text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest mb-6 sm:mb-8'>
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Deploy New Task
            </h2>
            
            <form onSubmit={submitHandler} className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                {/* Left side form inputs */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-5">
                    <div>
                        <h3 className='text-[10px] font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Task Title</h3>
                        <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required 
                            className='w-full outline-none bg-black/40 border border-white/10 focus:border-cyan-400 focus:bg-white/5 text-white rounded-xl py-3 px-5 text-sm placeholder:text-gray-600 transition-all' type="text" placeholder='e.g., Update Database' />
                    </div>
                    <div>
                        <h3 className='text-[10px] font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Date</h3>
                        <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required 
                            className='w-full outline-none bg-black/40 border border-white/10 focus:border-cyan-400 focus:bg-white/5 text-gray-400 rounded-xl py-3 px-5 text-sm transition-all' type="date" />
                    </div>
                    <div>
                        <h3 className='text-[10px] font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Assign To</h3>
                        <input value={assignTo} onChange={(e) => setAssignTo(e.target.value)} required 
                            className='w-full outline-none bg-black/40 border border-white/10 focus:border-cyan-400 focus:bg-white/5 text-white rounded-xl py-3 px-5 text-sm placeholder:text-gray-600 transition-all' type="text" placeholder='Operative Name' />
                    </div>
                    <div>
                        <h3 className='text-[10px] font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Category</h3>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} required 
                            className='w-full outline-none bg-black/40 border border-white/10 focus:border-cyan-400 focus:bg-white/5 text-white rounded-xl py-3 px-5 text-sm placeholder:text-gray-600 transition-all' type="text" placeholder='e.g., Development' />
                    </div>
                </div>
                
                {/* Right side for description */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <h3 className='text-[10px] font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Description</h3>
                    <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required 
                        className='flex-1 w-full outline-none bg-black/40 border border-white/10 focus:border-cyan-400 focus:bg-white/5 text-white rounded-xl py-3 px-5 text-sm placeholder:text-gray-600 transition-all resize-none' rows="8" placeholder='Detailed Task Specifications...'></textarea>
                    
                    <button className='w-full mt-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300 font-bold text-xs py-4 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95'>
                        Deploy Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask