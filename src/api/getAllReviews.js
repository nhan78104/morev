import api from './axiosConfig'

const getAllReviews = async (id) => {
  try {
    const response = await api.get(`/api/v1/reviews/${id}`)

    return Promise.resolve(response.data)
  } catch (error) {
    console.log('get all reviews error: ' + error)
    return Promise.reject(error)
  }
}

export default getAllReviews
