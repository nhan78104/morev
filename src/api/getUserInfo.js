import api from './axiosConfig'

const getUserInfo = async (accessToken) => {
  try {
    const res = await api.get('/api/v1/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return Promise.resolve(res.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export default getUserInfo
