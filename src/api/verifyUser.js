import api from './axiosConfig'

const verifyUser = async (accessToken, veriryCode) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    const response = await api.get(`/api/v1/auth/verify?code=${veriryCode}`, headers)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log('verify user error: ' + error)
    return Promise.reject(error)
  }
}

export default verifyUser
