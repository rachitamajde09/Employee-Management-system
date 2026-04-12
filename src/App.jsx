import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import Notification from './components/other/Notification'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, SetUserData] = useContext(AuthContext)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const userDataObj = JSON.parse(loggedInUser)
      setUser(userDataObj.role)
      setLoggedInUserData(userDataObj.data)
    }
  },[])

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      // Trigger Welcome Notification
      window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: 'Admin Override Accepted', type: 'success' } }))
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && e.password === password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
        // Trigger Welcome Notification
        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Welcome back, ${employee.firstName}`, type: 'success' } }))
      } else {
        // Trigger Error Notification
        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: 'Invalid Credentials', type: 'error' } }))
      }
    }
  }

  return (
    <>
      {/* The Global Notification Container */}
      <Notification /> 
      
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user === 'admin' ? <AdminDashboard changeUser={setUser} /> : (user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
    </>
  )
}

export default App