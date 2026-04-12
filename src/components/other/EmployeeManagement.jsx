import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeManagement = () => {
    // Note: Assuming your AuthProvider exports [userData, setUserData]
    const [userData, setUserData] = useContext(AuthContext) 
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        
        // Auto-generate a new ID
        const newId = userData && userData.length > 0 ? Math.max(...userData.map(u => u.id || 0)) + 1 : 1;

        const newEmployee = {
            id: newId,
            firstName: firstName,
            email: email,
            password: password,
            taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 },
            tasks: []
        }

        const updatedData = [...(userData || []), newEmployee];
        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData)) // Update local storage

        setFirstName('')
        setEmail('')
        setPassword('')
        const removeEmployee = (idToRemove) => {
        const updatedData = userData.filter(emp => emp.id !== idToRemove);
        setUserData(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedData));
        
        // Trigger Warning Notification!
        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: 'Operative profile terminated.', type: 'warning' } }))
    }
    }

    const removeEmployee = (idToRemove) => {
        const updatedData = userData.filter(emp => emp.id !== idToRemove);
        setUserData(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedData));
    }

    return (
        <div className='flex flex-wrap gap-8 mt-6'>
            
            {/* Registration Form Panel */}
            <div className='w-full lg:w-[35%] bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    </div>
                    <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-widest'>Register Operative</h2>
                </div>

                <form onSubmit={submitHandler} className='flex flex-col space-y-5'>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>First Name</h3>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-600' type="text" placeholder='e.g., Alex' />
                    </div>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Email Identity</h3>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-600' type="email" placeholder='employee@company.com' />
                    </div>
                    <div>
                        <h3 className='text-xs font-mono text-cyan-400/80 mb-2 uppercase tracking-widest'>Access Passcode</h3>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-600' type="password" placeholder='Enter initial passcode' />
                    </div>

                    <button className='group relative w-full mt-4 overflow-hidden rounded-xl'>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-[length:200%_auto] animate-gradient"></div>
                        <div className="relative flex items-center justify-center px-8 py-3.5 bg-black/40 text-white font-bold text-sm tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-300 group-hover:bg-transparent group-active:scale-[0.98]">
                            Initialize Profile
                        </div>
                    </button>
                </form>
            </div>

            {/* Active Employees Matrix (List) */}
            <div className='w-full lg:flex-1 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500 uppercase tracking-widest'>Active Personnel Matrix</h2>
                </div>
                
                <div className='flex flex-col space-y-3 h-[420px] overflow-y-auto pr-2 custom-scrollbar'>
                    {userData && userData.length > 0 ? (
                        userData.map((emp) => (
                            <div key={emp.id} className='flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group'>
                                <div>
                                    <h3 className='text-white font-bold text-lg'>{emp.firstName}</h3>
                                    <p className='text-xs text-cyan-400/70 font-mono mt-1'>{emp.email}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right hidden sm:block mr-4">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Active Tasks</p>
                                        <p className="text-sm font-bold text-white">{emp.tasks ? emp.tasks.length : 0}</p>
                                    </div>
                                    <button 
                                        onClick={() => removeEmployee(emp.id)} 
                                        className='bg-red-500/10 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                                    >
                                        Terminate
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="font-mono text-sm tracking-widest uppercase">No Personnel Found</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default EmployeeManagement