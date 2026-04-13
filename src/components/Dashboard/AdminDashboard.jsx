import React, { useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import EmployeeManagement from '../other/EmployeeManagement'
import AdminLeave from '../other/AdminLeave'
import AdminAttendance from '../other/AdminAttendance'
import AdminPayroll from '../other/AdminPayroll'
import AdminAssets from '../other/AdminAssets'
import Navbar from '../other/Navbar' // Naya Navbar Import kiya hai

const AdminDashboard = (props) => {
    const [activeTab, setActiveTab] = useState('tasks')

    // Menu ke tabs ki list
    const adminTabs = [
        { id: 'tasks', label: 'Dashboard' },
        { id: 'employees', label: 'Operatives' },
        { id: 'leave', label: 'Leave Requests' },
        { id: 'attendance', label: 'Live Roster' },
        { id: 'payroll', label: 'Payroll' },
        { id: 'assets', label: 'Inventory' }
    ]

    return (
        <div className='relative min-h-screen w-full p-4 sm:p-10 bg-[#050505] overflow-hidden font-sans'>
            <Header changeUser={props.changeUser} data={props.data} />
            
            {/* Purane buttons hatakar naya mobile-friendly Navbar lagaya hai */}
            <Navbar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                tabs={adminTabs} 
                userType="Admin" 
            />

            <div className="transition-all duration-500 ease-in-out">
                {activeTab === 'tasks' && (
                    <>
                        <CreateTask />
                        <AllTask />
                    </>
                )}
                {activeTab === 'employees' && <EmployeeManagement />}
                {activeTab === 'leave' && <AdminLeave />}
                {activeTab === 'attendance' && <AdminAttendance />}
                {activeTab === 'payroll' && <AdminPayroll />}
                {activeTab === 'assets' && <AdminAssets />}
            </div>
        </div>
    )
}

export default AdminDashboard