import api from './axiosConfig'

export const getAllUsers = (accessToken) =>
  api.get('/api/v1/management/users', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

export const getAllMovies = () => api.get('/api/v1/movies')
export const deleteMovieById = (id, accessToken) =>
  api.delete(`/api/v1/management/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
export const deleteUserById = (id, accessToken) =>
  api.delete(`/api/v1/management/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
