import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'
import api from '../services/api'
import { getProfile, UserData } from '../services/auth'

interface AuthContextData {
  signed: boolean
  user: UserData
  signIn(params: { password: string; email: string }): Promise<UserData>

  register(params: {
    password: string
    email: string
    name: string
    surname: string
  }): Promise<UserData>
  signOut(): void
  setLocalUser(param: UserData): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null)

  function setLocalUser(userData: UserData) {
    setUser(userData)
    localStorage.setItem('@proffy:user', JSON.stringify(userData))
  }

  function setLocalToken(tokenData: string) {
    // setToken(tokenData)
    api.defaults.headers['Authorization'] = `Bearer ${tokenData}`
    localStorage.setItem('@proffy:token', JSON.stringify(tokenData))
  }

  async function signIn(params: { email: string; password: string }) {
    const response = (await auth.authenticate(params)).data
    if (response) {
      setLocalToken(response.token)
      setLocalUser(response.user)
    }
  }

  function signOut() {
    localStorage.removeItem('@proffy:user')
    localStorage.removeItem('@proffy:token')

    setUser(null)
  }

  async function register(params: {
    email: string
    password: string
    name: string
    surname: string
  }) {
    const response = (await auth.register(params)).data

    setLocalToken(response.token)
    setLocalUser(response.user)
  }

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem('@proffy:user') as string,
    )
    const storedToken = JSON.parse(
      localStorage.getItem('@proffy:token') as string,
    )

    if (storedUser && storedToken && !user) {
      setUser(storedUser)
      // setToken(storedToken)
      api.defaults.headers['Authorization'] = `Bearer ${storedToken}`
    } else if (user) {
      getProfile().then((response) => {
        setLocalUser(response.data.user)
      })
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        // @ts-ignore
        user,
        // @ts-ignore
        signIn,
        signOut,
        // @ts-ignore
        register,
        setLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
