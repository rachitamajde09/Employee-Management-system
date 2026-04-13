import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeAssets = ({ data }) => {
    const [userData] = useContext(AuthContext)

    // Find current employee's assets
    const currentEmp = userData.find(emp => emp.firstName === data.firstName)
    const myAssets = currentEmp?.assets || []

    return (
        <div className='flex flex-col gap-6 mt-6'>
            
            <div className="flex items-center space-x-3 mb-2 px-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h2 className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-500 uppercase tracking-widest'>My Assigned Assets</h2>
            </div>

            <div className='w-full bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
                    {myAssets.length > 0 ? (
                        myAssets.map(asset => (
                            <div key={asset.id} className='bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 group'>
                                
                                <div>
                                    <div className='flex justify-between items-start mb-4'>
                                        <span className='text-[10px] text-indigo-400 uppercase font-mono tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20'>
                                            {asset.type}
                                        </span>
                                        <span className='text-emerald-400 text-xs font-bold flex items-center'>
                                            <span className='w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse'></span> Active
                                        </span>
                                    </div>
                                    <h3 className='text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors'>{asset.name}</h3>
                                    <p className='text-xs text-gray-500 font-mono tracking-widest uppercase'>ID: {asset.assetId}</p>
                                </div>

                                <div className='mt-6 pt-4 border-t border-white/10'>
                                    <p className='text-[10px] text-gray-500 uppercase tracking-widest mb-1'>Date Assigned</p>
                                    <p className='text-sm text-gray-300 font-bold'>{asset.dateAssigned}</p>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className='col-span-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl py-10'>
                            <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            <p className='text-gray-500 text-sm font-mono uppercase tracking-widest'>No company assets assigned</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmployeeAssets