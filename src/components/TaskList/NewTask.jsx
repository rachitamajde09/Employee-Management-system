import React from 'react'

const NewTask = ({data}) => {
    return (
        <div className='flex flex-col flex-shrink-0 h-[350px] w-[300px] sm:w-[350px] p-6 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 rounded-[2rem] shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-2 transition-transform duration-300'>
            
            {/* Top Bar: Category & Date */}
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono px-3 py-1.5 rounded-full uppercase tracking-wider'>{data.category}</span>
                <h4 className='text-xs text-gray-400 font-mono'>{data.taskDate}</h4>
            </div>
            
            {/* Task Title (Truncated if too long) */}
            <h2 className='mt-2 text-xl font-black text-white truncate'>{data.taskTitle}</h2>
            
            {/* Description Area (Internal scrolling to fix overlap) */}
            <div className='mt-4 flex-1 overflow-y-auto pr-2 custom-scrollbar'>
                <p className='text-sm text-gray-400 leading-relaxed'>
                    {data.taskDescription}
                </p>
            </div>
            
            {/* Button Anchored to Bottom */}
            <div className='mt-6 pt-4 border-t border-white/10'>
                <button className='w-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-widest py-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95'>
                    Accept Task
                </button>
            </div>
            
        </div>
    )
}

export default NewTask