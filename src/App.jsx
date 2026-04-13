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
    // 1. Admin Check (Static)
    if (email == 'admin@me.com' && password == '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } 
    // 2. Employee Check (Live Data from Firebase)
    else if (userData) {
      // Hum userData (Firebase array) mein us employee ko dhundenge
      const employee = userData.find((e) => email == e.email && password == e.password)
      
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
      } else {
        alert("Invalid Credentials")
      }
    } 
    else {
      alert("Invalid Credentials")
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
