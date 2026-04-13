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
    // 1. Console Branding Signature
    console.log(
        "%c ENGINEERED BY RACHITA MAJDE %c v2.4.0 ",
        "background: #06b6d4; color: #fff; padding: 5px; border-radius: 3px; font-weight: bold; font-family: monospace;",
        "background: #1e293b; color: #94a3b8; padding: 5px; border-radius: 3px; font-family: monospace;"
    );

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
      alert("Database Syncing... Please wait a second and try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <main className="flex-1">
        {!user ? <Login handleLogin={handleLogin} /> : ''}
        {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
      </main>

      {/* 2. Global Footer Signature - Visible on both Dashboards */}
      {user && (
        <footer className="py-6 text-center border-t border-white/5 bg-black/20 backdrop-blur-md">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em]">
                © 2026 EMS Core — Engineered by <span className="text-white/60 font-black">Rachita Majde</span>
            </p>
        </footer>
      )}

      {/* 3. Notification Toast */}
      {notification && (
        <div className={`fixed bottom-10 right-10 z-[9999] px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-500 flex items-center space-x-4 animate-bounce-in
            ${notification.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10' 
                : 'bg-red-500/10 border-red-500/40 text-red-400 shadow-red-500/10'}`}>
            
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${notification.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
            
            <div className="flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-0.5">System Message</p>
                <p className="font-bold text-xs uppercase tracking-widest">{notification.message}</p>
            </div>
            
            <button onClick={() => setNotification(null)} className="ml-4 opacity-40 hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
      )}
    </div>
  )
}

export default App
