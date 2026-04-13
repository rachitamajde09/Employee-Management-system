import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AdminPayroll = () => {
    const [userData, setUserData] = useContext(AuthContext)
    
    // States to handle inputs for bonuses/deductions for specific employees
    const [adjustments, setAdjustments] = useState({})

    const handleInputChange = (empName, field, value) => {
        setAdjustments(prev => ({
            ...prev,
            [empName]: {
                ...prev[empName],
                [field]: Number(value) || 0
            }
        }))
    }

    const processPayroll = (empName) => {
        const allUsers = [...userData]
        const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
        
        allUsers.forEach(emp => {
            if (emp.firstName === empName) {
                // Initialize payroll arrays if they don't exist
                if (!emp.baseSalary) emp.baseSalary = 45000;
                if (!emp.payslips) emp.payslips = [];

                // Prevent generating duplicate payslips for the same month
                const alreadyProcessed = emp.payslips.find(p => p.month === currentMonth)
                if (alreadyProcessed) {
                    window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Payroll already processed for ${empName} this month.`, type: 'warning' } }))
                    return;
                }

                const bonus = adjustments[empName]?.bonus || 0;
                const deduction = adjustments[empName]?.deduction || 0;
                const netPay = emp.baseSalary + bonus - deduction;

                const newPayslip = {
                    id: Date.now(),
                    month: currentMonth,
                    date: new Date().toLocaleDateString(),
                    base: emp.baseSalary,
                    bonus: bonus,
                    deduction: deduction,
                    netPay: netPay
                }

                emp.payslips.push(newPayslip)
                
                setUserData(allUsers)
                localStorage.setItem('employees', JSON.stringify(allUsers))
                
                // Clear inputs for this user
                setAdjustments(prev => ({...prev, [empName]: {bonus: 0, deduction: 0}}))
                window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Payslip generated for ${empName}. Net: ₹${netPay}`, type: 'success' } }))
            }
        })
    }

    return (
        <div className='bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-5 sm:p-8 mt-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-x-auto custom-scrollbar'>
            
            <div className="flex items-center space-x-3 mb-8 min-w-[800px]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500 uppercase tracking-widest'>Payroll Processing Engine</h2>
            </div>

            <div className='min-w-[900px]'>
                {/* Table Header */}
                <div className='bg-purple-500/20 border border-purple-500/30 mb-4 py-3 px-6 flex justify-between items-center rounded-2xl'>
                    <h2 className='text-xs font-mono text-purple-400 uppercase tracking-widest w-[20%]'>Operative Name</h2>
                    <h3 className='text-xs font-mono text-purple-400 uppercase tracking-widest w-[15%]'>Base Salary</h3>
                    <h5 className='text-xs font-mono text-purple-400 uppercase tracking-widest w-[20%]'>Add Bonus (₹)</h5>
                    <h5 className='text-xs font-mono text-purple-400 uppercase tracking-widest w-[20%]'>Deduction (₹)</h5>
                    <h5 className='text-xs font-mono text-purple-400 uppercase tracking-widest w-[20%] text-right'>Action</h5>
                </div>

                {/* Table Body */}
                <div className='flex flex-col space-y-3'>
                    {userData?.map((emp, idx) => {
                        const base = emp.baseSalary || 45000;
                        const currentBonus = adjustments[emp.firstName]?.bonus || '';
                        const currentDeduction = adjustments[emp.firstName]?.deduction || '';
                        const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
                        const isProcessed = emp.payslips?.some(p => p.month === currentMonth);

                        return (
                            <div key={idx} className={`bg-white/5 border transition-colors py-4 px-6 flex justify-between items-center rounded-2xl ${isProcessed ? 'border-emerald-500/30 opacity-70' : 'border-white/10 hover:bg-white/10'}`}>
                                <div className='w-[20%]'>
                                    <h2 className='text-base font-bold text-white truncate'>{emp.firstName}</h2>
                                    <p className='text-[10px] text-gray-500 font-mono'>{emp.email}</p>
                                </div>
                                
                                <h3 className='text-base font-bold text-gray-300 w-[15%]'>₹{base.toLocaleString()}</h3>
                                
                                <div className='w-[20%] pr-4'>
                                    <input 
                                        type="number" 
                                        value={currentBonus}
                                        onChange={(e) => handleInputChange(emp.firstName, 'bonus', e.target.value)}
                                        disabled={isProcessed}
                                        className='w-full bg-black/40 border border-emerald-500/30 rounded-xl py-2 px-4 text-sm text-emerald-400 outline-none focus:border-emerald-400 transition-all placeholder:text-gray-600 disabled:opacity-50' 
                                        placeholder='+ 0' 
                                    />
                                </div>

                                <div className='w-[20%] pr-4'>
                                    <input 
                                        type="number" 
                                        value={currentDeduction}
                                        onChange={(e) => handleInputChange(emp.firstName, 'deduction', e.target.value)}
                                        disabled={isProcessed}
                                        className='w-full bg-black/40 border border-red-500/30 rounded-xl py-2 px-4 text-sm text-red-400 outline-none focus:border-red-400 transition-all placeholder:text-gray-600 disabled:opacity-50' 
                                        placeholder='- 0' 
                                    />
                                </div>

                                <div className='w-[20%] flex justify-end'>
                                    {isProcessed ? (
                                        <span className='px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'>
                                            Processed
                                        </span>
                                    ) : (
                                        <button 
                                            onClick={() => processPayroll(emp.firstName)}
                                            className='bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500 hover:text-white transition-all duration-300 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-95'>
                                            Generate
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminPayroll