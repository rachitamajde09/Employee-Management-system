import React, { createContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { getLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        // Set up a real-time listener to a document called "companyData" inside the "ems" collection
        const docRef = doc(db, "ems", "companyData");

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                // If cloud data exists, load it into our app!
                setUserData(docSnap.data().employees);
            } else {
                // FIRST TIME SETUP: If the cloud is empty, grab our default data from local storage 
                // and push it up to Firebase to initialize the database.
                const { employees } = getLocalStorage();
                setDoc(docRef, { employees: employees });
            }
        });

        // Cleanup the listener when app closes
        return () => unsubscribe();
    }, [])

    return (
        <div>
            <AuthContext.Provider value={[userData, setUserData]}>
                {userData ? children : <div className="min-h-screen bg-[#050505] flex items-center justify-center text-cyan-400 font-mono tracking-widest animate-pulse">CONNECTING TO CLOUD...</div>}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider