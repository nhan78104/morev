import api from './axiosConfig'

const addReview = async (accessToken, id, message) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }

    const data = JSON.stringify(message)

    const response = await api.post(`/api/v1/reviews/${id}`, data, { headers })

    return response.data
  } catch (error) {
    console.log('add review error: ', error)
    return error
  }
}

export default addReview
