import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AdminAssets = () => {
    const [userData, setUserData] = useContext(AuthContext)
    
    // Form State
    const [assetName, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('Hardware')
    const [assignee, setAssignee] = useState('')
    const [assetTag, setAssetTag] = useState('')

    const assignAsset = (e) => {
        e.preventDefault()
        const allUsers = [...userData]
        let found = false

        allUsers.forEach(emp => {
            if (emp.firstName === assignee) {
                if (!emp.assets) emp.assets = []
                
                emp.assets.push({
                    id: Date.now(),
                    assetId: assetTag || `AST-${Math.floor(Math.random() * 10000)}`,
                    name: assetName,
                    type: assetType,
                    dateAssigned: new Date().toLocaleDateString()
                })
                found = true
            }
        })

        if (!found) {
            window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Operative "${assignee}" not found.`, type: 'error' } }))
            return
        }

        setUserData(allUsers)
        localStorage.setItem('employees', JSON.stringify(allUsers))
        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Asset assigned to ${assignee}.`, type: 'success' } }))

        setAssetName('')
        setAssignee('')
        setAssetTag('')
    }

    const revokeAsset = (empName, assetId) => {
        const allUsers = [...userData]
        allUsers.forEach(emp => {
            if (emp.firstName === empName && emp.assets) {
                emp.assets = emp.assets.filter(a => a.id !== assetId)
            }
        })
        setUserData(allUsers)
        localStorage.setItem('employees', JSON.stringify(allUsers))
        window.dispatchEvent(new CustomEvent('show-notification', { detail: { message: `Asset revoked from ${empName}.`, type: 'warning' } }))
    }

    // Gather all assigned assets for the table
    let allAssets = []
    if (userData) {
        userData.forEach(emp => {
            if (emp.assets) {
                emp.assets.forEach(asset => {
                    allAssets.push({ ...asset, empName: emp.firstName, empEmail: emp.email })
                })
            }
        })
    }

    return (
        <div className='flex flex-col xl:flex-row gap-8 mt-10'>
            
            {/* Deploy Asset Form */}
            <div className='w-full xl:w-1/3 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-6 sm:p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] h-fit'>
                <h2 className='text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-500 uppercase tracking-widest mb-6 flex items-center'>
                    <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Deploy Asset
                </h2>

                <form onSubmit={assignAsset} className='flex flex-col space-y-4'>
                    <div>
                        <h3 className='text-[10px] font-mono text-indigo-400/80 mb-2 uppercase tracking-widest'>Asset Name</h3>
                        <input value={assetName} onChange={(e) => setAssetName(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-indigo-400 transition-all placeholder:text-gray-600' type="text" placeholder='e.g., MacBook Pro M3' />
                    </div>
                    <div>
                        <h3 className='text-[10px] font-mono text-indigo-400/80 mb-2 uppercase tracking-widest'>Asset Type</h3>
                        <select value={assetType} onChange={(e) => setAssetType(e.target.value)}
                            className='w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-indigo-400 transition-all appearance-none'>
                            <option value="Hardware">Hardware (Laptop/Phone)</option>
                            <option value="Software">Software License</option>
                            <option value="Access">Security / Access Card</option>
                        </select>
                    </div>
                    <div>
                        <h3 className='text-[10px] font-mono text-indigo-400/80 mb-2 uppercase tracking-widest'>Asset Tag ID (Optional)</h3>
                        <input value={assetTag} onChange={(e) => setAssetTag(e.target.value)}
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-indigo-400 transition-all placeholder:text-gray-600' type="text" placeholder='e.g., AST-8492' />
                    </div>
                    <div>
                        <h3 className='text-[10px] font-mono text-indigo-400/80 mb-2 uppercase tracking-widest'>Assign To</h3>
                        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} required
                            className='w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none focus:border-indigo-400 transition-all placeholder:text-gray-600' type="text" placeholder='Employee First Name' />
                    </div>
                    
                    <button className='w-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 hover:bg-indigo-500 hover:text-white transition-all duration-300 py-3 mt-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)] active:scale-95'>
                        Dispatch
                    </button>
                </form>
            </div>

            {/* Asset Ledger Table */}
            <div className='w-full xl:w-2/3 bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-6 sm:p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-x-auto custom-scrollbar'>
                <h2 className='text-lg font-black text-white uppercase tracking-widest mb-6 min-w-[600px]'>Active Asset Ledger</h2>
                
                <div className='min-w-[700px]'>
                    <div className='bg-indigo-500/20 border border-indigo-500/30 mb-4 py-3 px-6 flex justify-between items-center rounded-2xl'>
                        <h2 className='text-xs font-mono text-indigo-400 uppercase tracking-widest w-[30%]'>Asset Info</h2>
                        <h3 className='text-xs font-mono text-indigo-400 uppercase tracking-widest w-[25%]'>Assigned To</h3>
                        <h5 className='text-xs font-mono text-indigo-400 uppercase tracking-widest w-[25%]'>Date</h5>
                        <h5 className='text-xs font-mono text-indigo-400 uppercase tracking-widest w-[20%] text-right'>Action</h5>
                    </div>

                    <div className='flex flex-col space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
                        {allAssets.length > 0 ? (
                            allAssets.map((asset, idx) => (
                                <div key={idx} className='bg-white/5 border border-white/10 hover:bg-white/10 transition-colors py-4 px-6 flex justify-between items-center rounded-2xl'>
                                    <div className='w-[30%] pr-4'>
                                        <h2 className='text-sm font-bold text-white truncate'>{asset.name}</h2>
                                        <p className='text-[10px] text-indigo-400 font-mono tracking-widest uppercase mt-1'>{asset.type} | {asset.assetId}</p>
                                    </div>
                                    
                                    <div className='w-[25%] pr-4'>
                                        <h3 className='text-sm font-bold text-gray-300 truncate'>{asset.empName}</h3>
                                        <p className='text-[10px] text-gray-500 font-mono truncate mt-1'>{asset.empEmail}</p>
                                    </div>

                                    <h5 className='text-sm font-bold text-gray-400 w-[25%]'>{asset.dateAssigned}</h5>

                                    <div className='w-[20%] flex justify-end'>
                                        <button onClick={() => revokeAsset(asset.empName, asset.id)}
                                            className='bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.2)] active:scale-95'>
                                            Revoke
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='h-full flex items-center justify-center'>
                                <p className='text-gray-500 text-sm font-mono uppercase tracking-widest'>No active assets found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAssets