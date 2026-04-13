import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)
  
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const parsedData = JSON.parse(loggedInUser)
      setUser(parsedData.role)
      setLoggedInUserData(parsedData.data)
    }

    const handleNotify = (e) => {
        setNotification(e.detail);
        setTimeout(() => setNotification(null), 4000);
    };
    window.addEventListener('show-notification', handleNotify);
    return () => window.removeEventListener('show-notification', handleNotify);
  }, [])

  const handleLogin = (email, password) => {
    if (email == 'admin@me.com' && password == '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } 
    else if (userData) {
      const employee = userData.find((e) => email == e.email && password == e.password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
      } else {
        alert("Invalid Credentials")
      }
    } else {
      alert("Database Syncing... Please wait.")
    }
  }

  return (
    <div className="h-screen w-screen bg-[#050505] flex flex-col overflow-hidden selection:bg-cyan-500/30 font-sans">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <main className="flex-1 overflow-y-auto relative z-10">
        {!user ? <Login handleLogin={handleLogin} /> : ''}
        {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
      </main>

      {/* Responsive Cyberpunk Status Bar */}
      <div className="relative z-50 w-full bg-black/80 backdrop-blur-md border-t border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Left: System Status */}
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
          <span className="text-[8px] sm:text-[9px] font-mono text-cyan-500/80 uppercase tracking-widest">Active</span>
        </div>

        {/* Center: Stylized Developer Badge (Mobile Optimized) */}
        <div className="flex items-center group">
          <span className="hidden xs:block text-[8px] font-mono text-white/20 uppercase tracking-[0.3em] mr-2">Dev</span>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full group-hover:border-cyan-500/40 transition-all duration-500">
             <span className="text-[9px] sm:text-[10px] font-black text-white/40 group-hover:text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-colors">
                Rachita Majde
             </span>
          </div>
        </div>

        {/* Right: Version/Date (Hidden on very small screens) */}
        <div className="hidden sm:block">
           <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">v2.4.0</span>
        </div>
        
        {/* Small Date for mobile only if space allows */}
        <div className="sm:hidden text-[8px] font-mono text-white/10 tracking-tighter">
          2026.04
        </div>
      </div>

      {/* Notification Toast (Mobile Adjusted) */}
      {notification && (
        <div className={`fixed bottom-16 right-4 left-4 sm:left-auto sm:right-6 z-[9999] px-4 py-3 rounded-xl border backdrop-blur-3xl shadow-2xl animate-bounce-in flex items-center space-x-3 
            ${notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${notification.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">{notification.message}</p>
        </div>
      )}
    </div>
  )
}

export default App
