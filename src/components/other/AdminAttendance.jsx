import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AdminAttendance = () => {
    const [userData] = useContext(AuthContext)

    return (
        <div className='bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-5 sm:p-8 mt-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest'>Live Roster Monitoring</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {userData?.map((emp, idx) => {
                    const isOnline = emp.attendance?.status === 'Online'
                    return (
                        <div key={idx} className={`relative overflow-hidden p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300
                            ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 opacity-75'}`}>
                            
                            {/* Glowing Dot */}
                            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse' : 'bg-gray-600'}`}></div>

                            <h3 className='text-lg font-bold text-white mb-1'>{emp.firstName}</h3>
                            <p className='text-xs font-mono text-gray-400 mb-4'>{emp.email}</p>
                            
                            <div className='flex justify-between items-end border-t border-white/10 pt-4 mt-2'>
                                <div>
                                    <p className='text-[10px] text-gray-500 uppercase tracking-widest'>Status</p>
                                    <p className={`text-sm font-bold tracking-wider ${isOnline ? 'text-emerald-400' : 'text-gray-500'}`}>
                                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                                    </p>
                                </div>
                                {isOnline && emp.attendance?.currentSession && (
                                    <div className='text-right'>
                                        <p className='text-[10px] text-emerald-400/70 uppercase tracking-widest'>Punched In</p>
                                        <p className='text-sm text-emerald-100 font-mono'>{emp.attendance.currentSession.displayTime}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminAttendance