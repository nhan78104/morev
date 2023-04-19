import axios from 'axios'

export default axios.create({
  baseURL: 'https://my-json-server.typicode.com/', // path from java api
  headers: { 'Access-Control-Allow-Origin': 'true' }, // path from java api
})
