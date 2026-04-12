import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AdminLeave = () => {
    const [userData, setUserData] = useContext(AuthContext)

    // Gather all leave requests from all employees
    let allRequests = []
    if (userData) {
        userData.forEach(emp => {
            if (emp.leaveRequests) {
                emp.leaveRequests.forEach(req => {
                    allRequests.push({ ...req, employeeName: emp.firstName, employeeEmail: emp.email })
                })
            }
        })
    }

    const updateStatus = (empName, reqId, newStatus) => {
        const allUsers = [...userData]
        allUsers.forEach(emp => {
            if (emp.firstName === empName && emp.leaveRequests) {
                emp.leaveRequests.forEach(req => {
                    if (req.id === reqId) {
                        req.status = newStatus
                    }
                })
            }
        })
        setUserData(allUsers)
        localStorage.setItem('employees', JSON.stringify(allUsers))
        if (newStatus === 'Approved') {
             window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Leave Approved for ${empName}.`, type: 'success' } }))
        } else {
             window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Leave Denied for ${empName}.`, type: 'error' } }))
        }
    }

    return (
        <div className='bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 mt-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-widest'>Pending Leave Approvals</h2>
            </div>

            <div className='flex flex-col space-y-4'>
                {allRequests.length > 0 ? (
                    allRequests.map((req, idx) => (
                        <div key={idx} className='flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl'>
                            
                            <div className='w-1/4'>
                                <h3 className='text-white font-bold text-lg'>{req.employeeName}</h3>
                                <p className='text-xs text-cyan-400/70 font-mono mt-1'>{req.employeeEmail}</p>
                            </div>
                            
                            <div className='w-1/4'>
                                <p className='text-[10px] text-gray-500 uppercase tracking-wider mb-1'>Date Requested</p>
                                <p className='text-sm font-bold text-gray-300'>{req.startDate} to {req.endDate}</p>
                            </div>

                            <div className='w-1/3'>
                                <p className='text-[10px] text-gray-500 uppercase tracking-wider mb-1'>Reason</p>
                                <p className='text-sm text-gray-400 truncate'>{req.reason}</p>
                            </div>

                            <div className='w-1/4 flex justify-end space-x-3'>
                                {req.status === 'Pending' ? (
                                    <>
                                        <button onClick={() => updateStatus(req.employeeName, req.id, 'Approved')} className='bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all duration-300'>
                                            Approve
                                        </button>
                                        <button onClick={() => updateStatus(req.employeeName, req.id, 'Rejected')} className='bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300'>
                                            Deny
                                        </button>
                                    </>
                                ) : (
                                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border ${
                                        req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                                    }`}>
                                        {req.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                        <p className="font-mono text-sm tracking-widest uppercase">No Leave Requests in System</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminLeave