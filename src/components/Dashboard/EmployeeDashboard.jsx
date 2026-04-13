import React, { useState } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import EmployeeLeave from '../other/EmployeeLeave'
import EmployeeAttendance from '../other/EmployeeAttendance'
import EmployeePayroll from '../other/EmployeePayroll'
import EmployeeAssets from '../other/EmployeeAssets'
import Navbar from '../other/Navbar' // Naya Navbar Import kiya hai

const EmployeeDashboard = (props) => {
    const [activeTab, setActiveTab] = useState('tasks')

    // Menu ke tabs ki list
    const employeeTabs = [
        { id: 'tasks', label: 'My Tasks' },
        { id: 'leave', label: 'Leave' },
        { id: 'attendance', label: 'Time Tracking' },
        { id: 'payroll', label: 'My Payroll' },
        { id: 'assets', label: 'My Assets' }
    ]

    return (
        <div className='relative min-h-screen w-full p-4 sm:p-10 bg-[#050505] overflow-hidden font-sans'>
            <Header changeUser={props.changeUser} data={props.data} />
            
            {/* Purane buttons hatakar naya mobile-friendly Navbar lagaya hai */}
            <Navbar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                tabs={employeeTabs} 
                userType="Operative" 
            />

            <div className="transition-all duration-500 ease-in-out">
                {activeTab === 'tasks' && (
                    <>
                        <TaskListNumbers data={props.data} />
                        <TaskList data={props.data} />
                    </>
                )}
                {activeTab === 'leave' && <EmployeeLeave data={props.data} />}
                {activeTab === 'attendance' && <EmployeeAttendance data={props.data} />}
                {activeTab === 'payroll' && <EmployeePayroll data={props.data} />}
                {activeTab === 'assets' && <EmployeeAssets data={props.data} />}
            </div>
        </div>
    )
}

export default EmployeeDashboard