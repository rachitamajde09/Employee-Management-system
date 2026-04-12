import React, { useState, useEffect } from 'react'

const Notification = () => {
    const [toasts, setToasts] = useState([])

    useEffect(() => {
        const handleNotify = (e) => {
            const { message, type } = e.detail
            const id = Date.now()
            
            // Add the new notification to the screen
            setToasts(prev => [...prev, { id, message, type }])

            // Auto-remove it after 3 seconds
            setTimeout(() => {
                setToasts(prev => prev.filter(toast => toast.id !== id))
            }, 3000)
        }

        // Listen for the custom global event
        window.addEventListener('show-notification', handleNotify)
        return () => window.removeEventListener('show-notification', handleNotify)
    }, [])

    return (
        <div className="fixed top-8 right-8 z-[9999] flex flex-col gap-4 pointer-events-none">
            {toasts.map(toast => (
                <div 
                    key={toast.id} 
                    className={`flex items-center space-x-3 px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-all duration-500 animate-slide-in
                        ${toast.type === 'success' ? 'bg-cyan-500/10 border-cyan-500/40 shadow-cyan-500/20 text-cyan-50' : ''}
                        ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/40 shadow-red-500/20 text-red-50' : ''}
                        ${toast.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/40 shadow-yellow-500/20 text-yellow-50' : ''}
                    `}
                >
                    {/* Dynamic Icon based on type */}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border 
                        ${toast.type === 'success' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : ''}
                        ${toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-400' : ''}
                        ${toast.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' : ''}
                    `}>
                        {toast.type === 'success' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                        {toast.type === 'error' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>}
                        {toast.type === 'warning' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>}
                    </div>
                    
                    <p className="text-sm font-bold tracking-wider">{toast.message}</p>
                </div>
            ))}
        </div>
    )
}

export default Notification