import React, { useState } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import EmployeeLeave from '../other/EmployeeLeave'

const EmployeeDashboard = (props) => {
  // State to handle which tab is currently visible (Tasks by default)
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className='relative min-h-screen w-full p-10 bg-[#050505] overflow-hidden font-sans'>
        
        {/* Liquid Futuristic Background Orbs */}
        <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[150px] animate-orb-1 pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[150px] animate-orb-2 pointer-events-none"></div>

        <div className='relative z-10 max-w-7xl mx-auto'>
            <Header changeUser={props.changeUser} data={props.data}/>
            
            {/* Employee Tab Navigation (2 Buttons) */}
            <div className="flex gap-2 my-8 p-1.5 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/10 w-fit shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <button 
                    onClick={() => setActiveTab('tasks')}
                    className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                        activeTab === 'tasks' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                        : 'text-gray-500 border border-transparent hover:text-gray-300'
                    }`}
                >
                    My Tasks
                </button>
                <button 
                    onClick={() => setActiveTab('leave')}
                    className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                        activeTab === 'leave' 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                        : 'text-gray-500 border border-transparent hover:text-gray-300'
                    }`}
                >
                    Leave Portal
                </button>
            </div>

            {/* Render Components based on which tab is clicked */}
            {activeTab === 'tasks' ? (
                <>
                    <TaskListNumbers data={props.data} />
                    <TaskList data={props.data} />
                </>
            ) : (
                <EmployeeLeave data={props.data} />
            )}
            
        </div>
    </div>
  )
}

export default EmployeeDashboard