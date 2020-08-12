import api from './api'

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

interface ResponseUserData {
  data: {
    user: UserData
  }
}

export interface Response {
  data: {
    token: string
    user: UserData
  }
}

export function authenticate(params: object): Promise<Response> {
  return api.post('authenticate', params)
}

export function register(params: object): Promise<Response> {
  return api.post('register', params)
}

export function getProfile(): Promise<ResponseUserData> {
  return api.get('profile')
}

export function updateProfile(params: UserData): Promise<ResponseUserData> {
  return api.put('profile', params)
}

export function adorableImage(param: string) {
  return `https://api.adorable.io/avatars/285/${param}@proffy.png`
}
