import React, { useEffect, useState, createContext, ReactNode } from 'react'
import app, { auth } from '../../config/firebase'

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [])
  
  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}