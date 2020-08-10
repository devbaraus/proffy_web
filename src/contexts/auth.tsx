import React, { createContext, useState, useEffect, useContext } from 'react'
import * as auth from '../services/auth'

interface AuthContextData {
    signed: boolean
    user: object | null

    signIn(): Promise<void>

    signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FunctionComponent = ({ children }) => {
    const [user, setUser] = useState<object | null>(null)
    // const [token, setToken] = useState<string>('')

    async function signIn() {
        const response = await auth.signIn()
        setUser(response.user)

        localStorage.setItem('@proffy:user', JSON.stringify(response.user))
        localStorage.setItem('@proffy:token', JSON.stringify(response.token))
    }

    function signOut() {
        localStorage.removeItem('@proffy:user')
        localStorage.removeItem('@proffy:token')
        setUser(null)
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('@proffy:user') as string)
        const storedToken = localStorage.getItem('@proffy:user')

        if (storedUser && storedToken) {
            setUser(storedUser)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider

export function useIsSigned() {
    const { user } = useContext(AuthContext)
    return !!user
}