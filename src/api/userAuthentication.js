import api from './axiosConfig'

const userAuthentication = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/authenticate', userData)

    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error.response.status)
  }
}

export default userAuthentication
