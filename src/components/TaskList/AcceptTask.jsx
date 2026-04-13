import React from 'react'

const AcceptTask = ({data}) => {
    return (
        <div className='flex flex-col flex-shrink-0 h-[350px] w-[300px] sm:w-[350px] p-6 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 rounded-[2rem] shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:-translate-y-2 transition-transform duration-300'>
            
            {/* Top Bar: Category & Date */}
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-mono px-3 py-1.5 rounded-full uppercase tracking-wider'>{data.category}</span>
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
            
            {/* Button Container - Fixed for Overflow */}
            <div className='mt-6 pt-4 border-t border-white/10 flex gap-3'>
                <button className='flex-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-white transition-all duration-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-95'>
                    Completed
                </button>
                <button className='flex-1 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all duration-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-95'>
                    Failed
                </button>
            </div>
            
        </div>
    )
}

export default AcceptTask