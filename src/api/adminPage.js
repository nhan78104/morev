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

export const addMovie = (accessToken, data) =>
  api.post('/api/v1/management/movies', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

export const getUserInfoById = (accessToken, id) =>
  api.get(`/api/v1/management/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

export const updateUser = (accessToken, userData) =>
  api.put(`/api/v1/management/users`, userData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
