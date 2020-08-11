import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://proffy-apiserver.herokuapp.com/v1/',
})

export default api
