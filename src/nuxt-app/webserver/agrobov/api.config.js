import axios from 'axios'
const host = 'http://api.agrobov.com.br/api/v1'

const api = axios.create({
  baseURL: host,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: null
  }
})

export default api
