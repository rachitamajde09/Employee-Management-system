import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeLeave = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        const newLeaveRequest = {
            id: Date.now(),
            startDate,
            endDate,
            reason,
            status: 'Pending' // Can be Pending, Approved, or Rejected
        }

        const allUsers = [...userData]
        // Find the currently logged-in employee by their email or first name
        allUsers.forEach(emp => {
            if (emp.firstName === data.firstName) {
                if (!emp.leaveRequests) emp.leaveRequests = []
                emp.leaveRequests.push(newLeaveRequest)
            }
        })

        setUserData(allUsers)
        localStorage.setItem('employees', JSON.stringify(allUsers))

        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: 'Leave request successfully transmitted.', type: 'success' } }))

        setStartDate('')
        setEndDate('')
        setReason('')
    }

    // Get current employee's leave history
    const currentEmployee = userData.find(emp => emp.firstName === data.firstName)
    const leaveHistory = currentEmployee?.leaveRequests || []

    return (
        <div className='flex flex-wrap gap-8 mt-6'>
            
            {/* Leave Request Form */}
            <div className='w-full lg:w-[35%] bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] h-fit'>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest'>Request Time Off</h2>
                </div>

                <form onSubmit={submitHandler} className='flex flex-col space-y-5'>
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Start Date</h3>
                            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} required
                                className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-gray-400' type="date" />
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>End Date</h3>
                            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} required
                                className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-gray-400' type="date" />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Reason for Leave</h3>
                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required
                            className='w-full h-32 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none placeholder:text-gray-600' placeholder='Briefly explain your reason...'></textarea>
                    </div>

                    <button className='group relative w-full mt-4 overflow-hidden rounded-xl'>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-[length:200%_auto] animate-gradient"></div>
                        <div className="relative flex items-center justify-center px-8 py-3.5 bg-black/40 text-white font-bold text-sm tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-300 group-hover:bg-transparent group-active:scale-[0.98]">
                            Submit Request
                        </div>
                    </button>
                </form>
            </div>

            {/* Leave History List */}
            <div className='w-full lg:flex-1 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500 uppercase tracking-widest'>Leave History</h2>
                </div>
                
                <div className='flex flex-col space-y-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar'>
                    {leaveHistory.length > 0 ? (
                        leaveHistory.map((leave) => (
                            <div key={leave.id} className='p-5 bg-white/5 border border-white/10 rounded-2xl'>
                                <div className='flex justify-between items-start mb-3'>
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>Duration</p>
                                        <h3 className='text-white font-bold'>{leave.startDate} <span className="text-gray-500 mx-2">to</span> {leave.endDate}</h3>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                        leave.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                        leave.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                    }`}>
                                        {leave.status}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-400 bg-black/20 p-3 rounded-xl border border-white/5'>{leave.reason}</p>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="font-mono text-sm tracking-widest uppercase">No Leave Requests Found</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default EmployeeLeave