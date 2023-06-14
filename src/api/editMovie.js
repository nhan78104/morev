import api from './axiosConfig'

export const getMovieById = (id) => api.get(`/api/v1/movies/${id}`)

export const updateMovieById = (data, accessToken) =>
  api.put(`/api/v1/management/movies`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
