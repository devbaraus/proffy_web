import React, {createContext, useState} from 'react'
import * as auth from '../services/auth'

interface AuthContextData {
    signed: boolean
    user: object | null

    signIn(): Promise<void>

    signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FunctionComponent = ({children}) => {
    const [user, setUser] = useState<object | null>({})

    async function signIn() {
        const response = await auth.signIn()
        setUser(response.user)
    }

    async function signOut() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
