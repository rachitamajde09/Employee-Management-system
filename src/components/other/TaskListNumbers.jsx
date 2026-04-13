import React from 'react'
import { MdOutlineRunningWithErrors, MdOutlineAutoAwesome, MdDoneAll, MdErrorOutline } from "react-icons/md";

const TaskListNumbers = ({data}) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8'>
            <div className='p-6 sm:p-8 rounded-[2rem] border-l-4 bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:-translate-y-2 transition-transform duration-300'>
                <MdOutlineRunningWithErrors className="text-3xl sm:text-4xl mb-3 opacity-80"/>
                <h2 className='text-3xl sm:text-5xl font-black'>{data.taskCounts.active}</h2>
                <h3 className='text-xs sm:text-xl mt-2 font-bold opacity-80 uppercase tracking-wider'>Active</h3>
            </div>
            
            <div className='p-6 sm:p-8 rounded-[2rem] border-l-4 bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-2 transition-transform duration-300'>
                <MdOutlineAutoAwesome className="text-3xl sm:text-4xl mb-3 opacity-80"/>
                <h2 className='text-3xl sm:text-5xl font-black'>{data.taskCounts.newTask}</h2>
                <h3 className='text-xs sm:text-xl mt-2 font-bold opacity-80 uppercase tracking-wider'>New</h3>
            </div>

            <div className='p-6 sm:p-8 rounded-[2rem] border-l-4 bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:-translate-y-2 transition-transform duration-300'>
                <MdDoneAll className="text-3xl sm:text-4xl mb-3 opacity-80"/>
                <h2 className='text-3xl sm:text-5xl font-black'>{data.taskCounts.completed}</h2>
                <h3 className='text-xs sm:text-xl mt-2 font-bold opacity-80 uppercase tracking-wider'>Completed</h3>
            </div>

            <div className='p-6 sm:p-8 rounded-[2rem] border-l-4 bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:-translate-y-2 transition-transform duration-300'>
                <MdErrorOutline className="text-3xl sm:text-4xl mb-3 opacity-80"/>
                <h2 className='text-3xl sm:text-5xl font-black'>{data.taskCounts.failed}</h2>
                <h3 className='text-xs sm:text-xl mt-2 font-bold opacity-80 uppercase tracking-wider'>Failed</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers