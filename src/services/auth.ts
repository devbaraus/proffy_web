import api from './api'

export interface Response {
  data: {
    token: string
    user: {
      id: number
      name: string
      email: string
    }
  }
}

export function authenticate(params: object): Promise<Response> {
  return api.post('authenticate', params)
}

export function register(params: object): Promise<Response> {
  return api.post('register', params)
}
