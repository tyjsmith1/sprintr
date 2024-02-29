import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const login = async (userCredentials) => {
        return new Promise(async (resolve,reject) => {
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
                resolve(user)
            } catch(error) {
                console.error("Login error: ", error)
                reject(error)
            }
        })
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