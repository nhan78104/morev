import api from './axiosConfig'

const requestResetPassword = async (email) => {
  try {
    const response = await api.get(`/api/v1/auth/reset-password?email=${email}`)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log('reset password error' + error)
    return Promise.reject(error)
  }
}

export default requestResetPassword
