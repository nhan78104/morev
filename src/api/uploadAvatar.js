import api from './axiosConfig'

const uploadAvatar = async (accessToken, fileInput, fileName) => {
  try {
    const data = new FormData()
    data.append('file', fileInput, fileName)

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    const response = await api.post('api/v1/images', data, headers)

    return Promise.resolve(response.data)
  } catch (error) {
    console.log('upload avatar error: ' + error)
    return Promise.reject(error)
  }
}

export default uploadAvatar
