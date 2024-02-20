import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const login = async (userCredentials) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            })
        
        if (!response.ok) {
            throw new Error('Failed to login')
        }

        const user = await response.json()
        setCurrentUser(user)
        } catch(error) {
            console.error("Login error: ", error)
            throw error
        }
    }

    const logout = () => {
        setCurrentUser(null)
    } 

    const value = {
        currentUser,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}