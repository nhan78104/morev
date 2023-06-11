import api from './axiosConfig'

const getMovieById = async (id) => {
  try {
    const response = await api.get(`api/v1/movies/${id}`)

    const singleMovie = response.data

    return Promise.resolve(singleMovie)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getMovieById
