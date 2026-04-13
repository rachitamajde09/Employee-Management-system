import React, { useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import EmployeeManagement from '../other/EmployeeManagement'
import AdminLeave from '../other/AdminLeave'
import AdminAttendance from '../other/AdminAttendance'
import AdminPayroll from '../other/AdminPayroll'
import AdminAssets from '../other/AdminAssets'

const AdminDashboard = (props) => {
    // State to handle which tab is currently visible (Tasks by default)
    const [activeTab, setActiveTab] = useState('tasks') 

    return (
        <div className='relative min-h-screen w-full p-10 bg-[#050505] overflow-hidden font-sans'>
            
            {/* Liquid Futuristic Background Orbs */}
            <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[150px] animate-orb-1 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[150px] animate-orb-2 pointer-events-none"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[200px] animate-pulse pointer-events-none"></div>

            <div className='relative z-10 max-w-7xl mx-auto'>
                <Header changeUser={props.changeUser} />
                
                {/* Modern Tab Navigation (3 Buttons) */}
                <div className="flex gap-2 my-8 p-1.5 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/10 w-fit shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <button 
                        onClick={() => setActiveTab('tasks')}
                        className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                            activeTab === 'tasks' 
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                            : 'text-gray-500 border border-transparent hover:text-gray-300'
                        }`}
                    >
                        Task Assignment
                    </button>
                    <button 
                        onClick={() => setActiveTab('employees')}
                        className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                            activeTab === 'employees' 
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                            : 'text-gray-500 border border-transparent hover:text-gray-300'
                        }`}
                    >
                        Personnel Database
                    </button>
                    <button 
                        onClick={() => setActiveTab('leave')}
                        className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                            activeTab === 'leave' 
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                            : 'text-gray-500 border border-transparent hover:text-gray-300'
                        }`}
                    >
                        Leave Approvals
                    </button>
                    <button 
                    onClick={() => setActiveTab('attendance')}
                    className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                        activeTab === 'attendance' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                        : 'text-gray-500 border border-transparent hover:text-gray-300'
                    }`}
                >
                    Time Tracking
                </button>
                <button 
                    onClick={() => setActiveTab('payroll')}
                    className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                        activeTab === 'payroll' 
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                        : 'text-gray-500 border border-transparent hover:text-gray-300'
                    }`}
                >
                    My Payroll
                </button>
                <button 
                        onClick={() => setActiveTab('assets')}
                        className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                            activeTab === 'assets' 
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                            : 'text-gray-500 border border-transparent hover:text-gray-300'
                        }`}
                    >
                        Asset Ledger
                    </button>
                </div>

                {/* Render components based on which tab is clicked */}
                <div className="transition-all duration-500 ease-in-out">
                    {activeTab === 'tasks' && (
                        <>
                            <CreateTask />
                            <AllTask />
                        </>
                    )}
                    {activeTab === 'employees' && <EmployeeManagement />}
                    {activeTab === 'leave' && <AdminLeave />}
                    {activeTab === 'attendance' && <AdminAttendance />}
                    {activeTab === 'payroll' && <AdminPayroll />}
                    {activeTab === 'assets' && <AdminAssets />}
                </div>
                
            </div>
        </div>
    )
}

export default AdminDashboard