import React, { useState } from 'react'

const Navbar = ({ activeTab, setActiveTab, tabs, userType }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="relative z-50 mb-8">
            <div className="flex items-center justify-between bg-white/[0.03] backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
                {/* Logo / Title */}
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-black text-white text-xs">
                        {userType[0].toUpperCase()}
                    </div>
                    <span className="text-white font-bold tracking-tighter uppercase text-sm hidden sm:block">
                        {userType} Control Center
                    </span>
                </div>

                {/* Desktop Menu (Visible on md screens and up) */}
                <div className="hidden md:flex items-center gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                                    : 'text-gray-500 border border-transparent hover:text-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Toggle Button (Visible on small screens) */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-400 hover:text-white p-2 transition-colors"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id)
                                    setIsOpen(false)
                                }}
                                className={`w-full text-left px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        : 'text-gray-500 border border-transparent hover:bg-white/5'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar