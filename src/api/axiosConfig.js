import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': "script-src 'unsafe-eval' 'unsafe-inline' http://localhost:8080",
  },
})
