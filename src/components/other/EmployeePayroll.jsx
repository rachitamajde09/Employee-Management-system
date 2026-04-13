import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const EmployeePayroll = ({ data }) => {
    const [userData] = useContext(AuthContext)

    // Find current employee and ensure they have payroll data initialized
    const currentEmp = userData.find(emp => emp.firstName === data.firstName)
    const baseSalary = currentEmp?.baseSalary || 45000 // Default to 45k if not set
    const payslips = currentEmp?.payslips || []

    return (
        <div className='flex flex-wrap lg:flex-nowrap gap-8 mt-6'>
            
            {/* Salary Overview Card */}
            <div className='w-full lg:w-1/3 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] h-fit relative overflow-hidden'>
                {/* Background Glow */}
                <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-yellow-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-500 uppercase tracking-widest'>Compensation</h2>
                </div>

                <p className='text-xs font-mono text-gray-500 uppercase tracking-widest mb-1'>Current Base Salary</p>
                <h1 className='text-4xl font-black text-white tracking-wider mb-6'>₹{baseSalary.toLocaleString()} <span className='text-sm text-gray-500 font-medium tracking-normal'>/ month</span></h1>
                
                <div className='bg-black/30 border border-white/5 rounded-xl p-5 mb-2'>
                    <div className='flex justify-between items-center mb-3'>
                        <span className='text-xs text-gray-400 uppercase tracking-widest'>Account Status</span>
                        <span className='text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full'>Active</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-xs text-gray-400 uppercase tracking-widest'>Next Payout</span>
                        <span className='text-sm text-white font-bold'>1st of Next Month</span>
                    </div>
                </div>
            </div>

            {/* Payslip History */}
            <div className='w-full lg:w-2/3 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                <h2 className='text-xl font-black text-white uppercase tracking-widest mb-6'>Payslip Vault</h2>
                
                <div className='flex flex-col space-y-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar'>
                    {payslips.length > 0 ? (
                        [...payslips].reverse().map(slip => (
                            <div key={slip.id} className='bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/10 transition-colors gap-4 sm:gap-0'>
                                
                                <div>
                                    <h3 className='text-lg font-bold text-emerald-400 mb-1'>{slip.month}</h3>
                                    <p className='text-[10px] text-gray-500 uppercase font-mono tracking-widest'>Generated: {slip.date}</p>
                                </div>

                                <div className='flex gap-6 items-center w-full sm:w-auto border-t sm:border-none border-white/10 pt-4 sm:pt-0 mt-2 sm:mt-0'>
                                    <div className='text-left sm:text-right'>
                                        <p className='text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1'>Net Pay</p>
                                        <p className='text-xl font-bold text-white'>₹{slip.netPay.toLocaleString()}</p>
                                    </div>
                                    
                                    <button onClick={() => window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Downloading Payslip for ${slip.month}...`, type: 'success' } }))} 
                                        className='ml-auto sm:ml-0 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95'>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className='h-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl'>
                            <p className='text-gray-500 text-sm font-mono uppercase tracking-widest'>No payslips generated yet</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default EmployeePayroll