import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeAttendance = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

    // Live Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
        return () => clearInterval(timer)
    }, [])

    const handlePunch = (action) => {
        const allUsers = [...userData]
        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const dateString = now.toLocaleDateString()

        allUsers.forEach(emp => {
            if (emp.firstName === data.firstName) {
                if (!emp.attendance) {
                    emp.attendance = { status: 'Offline', currentSession: null, logs: [] }
                }

                if (action === 'in') {
                    emp.attendance.status = 'Online'
                    emp.attendance.currentSession = { startTime: now.getTime(), displayTime: timeString }
                    window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: 'Punched In Successfully. Shift Started.', type: 'success' } }))
                } else if (action === 'out') {
                    if (emp.attendance.currentSession) {
                        const durationMs = now.getTime() - emp.attendance.currentSession.startTime
                        const hours = Math.floor(durationMs / (1000 * 60 * 60))
                        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
                        
                        emp.attendance.logs.unshift({
                            id: Date.now(),
                            date: dateString,
                            punchIn: emp.attendance.currentSession.displayTime,
                            punchOut: timeString,
                            duration: `${hours}h ${minutes}m`
                        })
                    }
                    emp.attendance.status = 'Offline'
                    emp.attendance.currentSession = null
                    window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: 'Punched Out. Shift Ended.', type: 'warning' } }))
                }
            }
        })

        setUserData(allUsers)
        localStorage.setItem('employees', JSON.stringify(allUsers))
    }

    // Get current state
    const currentEmp = userData.find(emp => emp.firstName === data.firstName)
    const attendanceData = currentEmp?.attendance || { status: 'Offline', logs: [] }
    const isOnline = attendanceData.status === 'Online'

    return (
        <div className='flex flex-wrap lg:flex-nowrap gap-8 mt-6'>
            
            {/* Punching Terminal */}
            <div className='w-full lg:w-1/3 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[400px]'>
                <h2 className='text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2'>Live Terminal</h2>
                <div className='text-4xl font-black text-white tracking-widest mb-10 font-mono'>{currentTime}</div>
                
                <div className="relative group w-48 h-48 flex items-center justify-center">
                    {/* Glowing Rings */}
                    <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${isOnline ? 'bg-emerald-500/30 animate-pulse' : 'bg-cyan-500/20'}`}></div>
                    
                    <button 
                        onClick={() => handlePunch(isOnline ? 'out' : 'in')}
                        className={`relative z-10 w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl active:scale-95
                        ${isOnline 
                            ? 'bg-black/50 border-red-500/50 hover:bg-red-500/20' 
                            : 'bg-black/50 border-emerald-500/50 hover:bg-emerald-500/20'}`}
                    >
                        <svg className={`w-10 h-10 mb-2 ${isOnline ? 'text-red-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOnline 
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>}
                        </svg>
                        <span className={`font-bold tracking-widest uppercase text-sm ${isOnline ? 'text-red-400' : 'text-emerald-400'}`}>
                            {isOnline ? 'Punch Out' : 'Punch In'}
                        </span>
                    </button>
                </div>
                
                <p className='mt-8 text-xs text-gray-500 uppercase tracking-widest'>
                    Status: <span className={`font-bold ${isOnline ? 'text-emerald-400' : 'text-gray-400'}`}>{attendanceData.status}</span>
                </p>
            </div>

            {/* Attendance Logs */}
            <div className='w-full lg:w-2/3 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest mb-6'>Shift History</h2>
                
                <div className='flex flex-col space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar'>
                    {attendanceData.logs.length > 0 ? (
                        attendanceData.logs.map(log => (
                            <div key={log.id} className='bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors'>
                                <div>
                                    <p className='text-[10px] text-cyan-400/80 uppercase font-mono tracking-wider mb-1'>{log.date}</p>
                                    <div className='flex items-center space-x-3'>
                                        <span className='text-emerald-400 text-sm font-bold'>{log.punchIn}</span>
                                        <span className='text-gray-600'>→</span>
                                        <span className='text-red-400 text-sm font-bold'>{log.punchOut}</span>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-[10px] text-gray-500 uppercase font-mono tracking-wider mb-1'>Duration</p>
                                    <p className='text-white font-bold tracking-wider'>{log.duration}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='h-full flex items-center justify-center'>
                            <p className='text-gray-500 text-sm font-mono uppercase tracking-widest'>No shift logs found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmployeeAttendance