import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('employee')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        setEmail("")
        setPassword("")
    }

    const handleRoleSwitch = (selectedRole) => {
        setRole(selectedRole)
        if (selectedRole === 'admin') {
            setEmail('admin@me.com')
            setPassword('123')
        } else {
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div className='relative flex h-screen w-screen items-center justify-center bg-[#050505] overflow-hidden font-sans'>
            
            {/* Liquid Futuristic Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[150px] animate-orb-1"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[150px] animate-orb-2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[200px] animate-pulse"></div>

            {/* Ultra-Modern Glass Card */}
            <div className='relative z-10 w-full max-w-md p-10 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)]'>
                
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 mb-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-wider uppercase mb-2">
                        {role === 'admin' ? 'System Admin' : 'Employee Access'}
                    </h1>
                    <p className="text-cyan-400/70 text-xs font-mono tracking-[0.2em] uppercase">Secure Authentication Gateway</p>
                </div>

                {/* Sliding Role Toggle */}
                <div className="relative flex items-center p-1.5 bg-black/40 rounded-full mb-8 border border-white/5">
                    <div 
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-transform duration-500 ease-out shadow-[0_0_15px_rgba(6,182,212,0.5)] ${
                            role === 'admin' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'
                        }`}
                    ></div>
                    
                    <button 
                        type="button"
                        onClick={() => handleRoleSwitch('employee')}
                        className={`flex-1 py-2.5 relative z-10 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                            role === 'employee' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Personnel
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleRoleSwitch('admin')}
                        className={`flex-1 py-2.5 relative z-10 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                            role === 'admin' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Override
                    </button>
                </div>

                {/* Login Form */}
                <form onSubmit={submitHandler} className='flex flex-col space-y-5'>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className='w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 placeholder:text-gray-600' 
                            type="email" 
                            placeholder='Identity [Email]' 
                        />
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className='w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none focus:bg-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 placeholder:text-gray-600' 
                            type="password" 
                            placeholder='Passcode' 
                        />
                    </div>

                    {/* Professional Options Row: Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between px-1 mt-2">
                        <label className="flex items-center text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors group">
                            <div className="relative flex items-center justify-center w-4 h-4 mr-2 border border-white/20 rounded bg-white/5 group-hover:border-cyan-400 transition-colors">
                                <input type="checkbox" className="absolute opacity-0 cursor-pointer w-full h-full peer" />
                                <svg className="w-3 h-3 text-cyan-400 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            Remember Access
                        </label>
                        
                        <a href="#" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-4 transition-all">
                            Forgot Passcode?
                        </a>
                    </div>

                    {/* Holographic Animated Button */}
                    <button className='group relative w-full mt-6 overflow-hidden rounded-2xl'>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-[length:200%_auto] animate-gradient"></div>
                        <div className="relative flex items-center justify-center px-8 py-4 bg-black/40 text-white font-bold text-sm tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-300 group-hover:bg-transparent group-active:scale-[0.98]">
                            Initialize Login
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </div>
                    </button>
                </form>

                {/* Professional Footer: Support & Security Badge */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center space-y-3">
                    <p className="text-xs text-gray-500">
                        Encountering issues? <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1 font-medium">Contact Support</a>
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-gray-600 font-mono">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        <span>END-TO-END ENCRYPTED</span>
                        <span>•</span>
                        <span>v2.4.0</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login