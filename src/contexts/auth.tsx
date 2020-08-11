import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'
import api from '../services/api'

export interface UserData {
  id?: number
  name?: string
  surname?: string
  avatar?: string
  bio?: string
  email: string
  password?: string
  whatsapp?: string
}

interface AuthContextData {
  signed: boolean
  user: UserData

  signIn(params: { password: string; email: string }): Promise<void>
  register(params: {
    password: string
    email: string
    name: string
    surname: string
  }): Promise<void>

  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string>('')

  async function signIn(params: { email: string; password: string }) {
    const response = (await auth.authenticate(params)).data

    setUser(response.user)
    setToken(response.token)

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`

    console.log(token, api.defaults.headers['Authorization'])

    localStorage.setItem('@proffy:user', JSON.stringify(response.user))
    localStorage.setItem('@proffy:token', JSON.stringify(response.token))
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

    setUser(response.user)
    setToken(response.token)

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`

    localStorage.setItem('@proffy:user', JSON.stringify(response.user))
    localStorage.setItem('@proffy:token', JSON.stringify(response.token))
  }

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem('@proffy:user') as string,
    )
    const storedToken = JSON.parse(
      localStorage.getItem('@proffy:token') as string,
    )

    if (storedUser && storedToken) {
      setUser(storedUser)
      setToken(storedToken)
      api.defaults.headers['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={{ signed: !!user, user, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
