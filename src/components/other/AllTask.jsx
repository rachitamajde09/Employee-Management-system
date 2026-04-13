import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
   const [userData, setUserData] = useContext(AuthContext)

  return (
    <div className='bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-5 sm:p-8 mt-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-x-auto custom-scrollbar'>
        <div className='min-w-[700px]'> {/* Forces a scrollbar on mobile instead of squishing text */}
            
            {/* Header Row */}
            <div className='bg-cyan-500/20 border border-cyan-500/30 mb-4 py-3 px-6 flex justify-between rounded-2xl'>
                <h2 className='text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest w-1/5'>Employee Name</h2>
                <h3 className='text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest w-1/5 text-center'>New Task</h3>
                <h5 className='text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest w-1/5 text-center'>Active Task</h5>
                <h5 className='text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest w-1/5 text-center'>Completed</h5>
                <h5 className='text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest w-1/5 text-center'>Failed</h5>
            </div>
            
            {/* Data Rows */}
            <div className='flex flex-col space-y-3'>
            {userData.map(function(elem, idx){
                return (
                <div key={idx} className='bg-white/5 border border-white/10 hover:bg-white/10 transition-colors py-3 px-6 flex justify-between items-center rounded-2xl'>
                    <h2 className='text-sm sm:text-base font-bold text-white w-1/5 truncate pr-4'>{elem.firstName}</h2>
                    <h3 className='text-sm sm:text-base font-bold text-cyan-400 w-1/5 text-center'>{elem.taskCounts.newTask}</h3>
                    <h5 className='text-sm sm:text-base font-bold text-yellow-400 w-1/5 text-center'>{elem.taskCounts.active}</h5>
                    <h5 className='text-sm sm:text-base font-bold text-emerald-400 w-1/5 text-center'>{elem.taskCounts.completed}</h5>
                    <h5 className='text-sm sm:text-base font-bold text-red-500 w-1/5 text-center'>{elem.taskCounts.failed}</h5>
                </div>
                )
            })}
            </div>
            
        </div>
    </div>
  )
}

export default AllTask