import api from './axiosConfig'

const addReview = async (id) => {
  try {
    const review = await api.post(`/api/v1/reviews/${id}`)
  } catch (error) {}
}

export default addReview
