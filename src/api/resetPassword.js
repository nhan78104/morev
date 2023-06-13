import api from './axiosConfig'

const resetPassword = async (resetCode, password, retypePassword) => {
  try {
    const data = {
      password,
      retypePassword,
    }
    // if (password !== retypePassword) {
    //   return Promise.reject({ field: 'retypePassword', detail: 'Retype password is different from password.' })
    // }

    const response = await api.post(`/api/v1/auth/reset-password?code=${resetCode}`, data)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log('reset password error' + error)
    return Promise.reject(error.response.data.errors)
  }
}

export default resetPassword
