import api from './axiosConfig'

const updateUser = (accessToken, updateInfo) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }

  const data = JSON.stringify(updateInfo)

  return api.put('/api/v1/user', data, { headers })
}

export default updateUser
