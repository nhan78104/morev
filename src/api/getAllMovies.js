import api from './axiosConfig'

const getAllMovies = async () => {
  try {
    const response = await api.get('/api/v1/movies')

    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export default getAllMovies
