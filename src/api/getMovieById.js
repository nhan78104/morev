import api from './axiosConfig'

const getMovieData = async (movieId) => {
  try {
    const response = await api.get(`api/v1/movies/${movieId}`)

    const singleMovie = response.data

    return Promise.resolve(singleMovie)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getMovieData
