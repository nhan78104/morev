import api from './axiosConfig'

const createUser = async (userData) => {
  const response = await api
    .post('/api/v1/auth/register', userData)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err.response.data.errors)
    })

  return response
}

export default createUser
