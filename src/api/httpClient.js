import axios from 'axios'

const httpClient = axios.create({
  //baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8081/api',
  baseURL: 'https://projeto-paripassu-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpClient