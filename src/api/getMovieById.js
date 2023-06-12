import api from './axiosConfig'

const getMovieById = (id) => api.get(`api/v1/movies/${id}`)

export default getMovieById
