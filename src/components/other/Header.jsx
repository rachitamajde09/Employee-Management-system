import React from 'react'

const Header = (props) => {
  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
  }

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-end justify-between relative z-10 gap-4 sm:gap-0'>
        <h1 className='text-xl sm:text-2xl font-medium text-gray-300'>Hello <br /> 
          <span className='text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-wider'>
            Username
          </span>
        </h1>
        <button 
          onClick={logOutUser} 
          className='w-full sm:w-auto bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-95'
        >
          System Logout
        </button>
    </div>
  )
}

export default Header