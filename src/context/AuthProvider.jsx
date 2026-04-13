import React, { createContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore'
import { setLocalStorage, getLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        // Initial check: Agar LocalStorage khali hai toh default data bharo
        const localData = getLocalStorage();
        if(!localData || !localData.employees){
            setLocalStorage();
        }

        const docRef = doc(db, "ems", "companyData");

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().employees) {
                // Agar Cloud mein data hai, toh use state mein daalo
                setUserData(docSnap.data().employees);
            } else {
                // FIRST TIME SYNC: Agar cloud khali hai, toh LocalStorage ka data push karo
                const { employees } = getLocalStorage();
                console.log("Cloud khali hai, uploading local data...");
                setDoc(docRef, { employees: employees });
            }
        }, (error) => {
            console.error("Firebase Sync Error:", error);
        });

        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={[userData, setUserData]}>
            {userData ? children : (
                <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-cyan-400 font-mono tracking-widest">
                    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    SYNCING CLOUD DATA...
                </div>
            )}
        </AuthContext.Provider>
    )
}

export default AuthProvider
