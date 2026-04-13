import React from 'react'

const Header = (props) => {
  return (
    <div className='flex items-center justify-between bg-white/[0.03] backdrop-blur-[10px] border border-white/10 p-4 sm:p-6 rounded-[1.5rem] shadow-[0_0_20px_rgba(0,0,0,0.5)]'>
        <div className="flex items-center gap-3">
          <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400" src="https://api.dicebear.com/8.x/initials/svg?seed=Admin" alt="User" />
          <div>
            <h1 className='text-xs sm:text-sm text-gray-400 font-mono tracking-widest uppercase'>Dashboard</h1>
            <h2 className='text-lg sm:text-2xl font-black text-white'>Control Panel <span className="text-xl">👋</span></h2>
          </div>
        </div>
        <button onClick={() => props.changeUser('')} className='bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]'>
            Log Out
        </button>
    </div>
  )
}

export default Header