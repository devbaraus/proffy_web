import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? `http://192.168.15.43:3333/v1/`
      : 'https://cors-anywhere.herokuapp.com/https://proffy-apiserver.herokuapp.com/v1/',
})

export default api
