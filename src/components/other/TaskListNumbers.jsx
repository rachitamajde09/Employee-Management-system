import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 gap-5'>
        {/* New Task - Cyan */}
        <div className='rounded-[1.5rem] w-full py-6 px-9 bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-transform duration-300'>
            <h2 className='text-4xl font-black text-cyan-400'>{data.taskCounts.newTask}</h2>
            <h3 className='text-xs mt-2 text-gray-300 font-mono tracking-widest uppercase'>New Task</h3>
        </div>
        
        {/* Completed Task - Green */}
        <div className='rounded-[1.5rem] w-full py-6 px-9 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-transform duration-300'>
            <h2 className='text-4xl font-black text-emerald-400'>{data.taskCounts.completed}</h2>
            <h3 className='text-xs mt-2 text-gray-300 font-mono tracking-widest uppercase'>Completed</h3>
        </div>
        
        {/* Accepted Task - Yellow */}
        <div className='rounded-[1.5rem] w-full py-6 px-9 bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:-translate-y-1 transition-transform duration-300'>
            <h2 className='text-4xl font-black text-yellow-400'>{data.taskCounts.active}</h2>
            <h3 className='text-xs mt-2 text-gray-300 font-mono tracking-widest uppercase'>Active Task</h3>
        </div>
        
        {/* Failed Task - Red */}
        <div className='rounded-[1.5rem] w-full py-6 px-9 bg-red-500/10 border border-red-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:-translate-y-1 transition-transform duration-300'>
            <h2 className='text-4xl font-black text-red-400'>{data.taskCounts.failed}</h2>
            <h3 className='text-xs mt-2 text-gray-300 font-mono tracking-widest uppercase'>Failed Task</h3>
        </div>
    </div>
  )
}

export default TaskListNumbers