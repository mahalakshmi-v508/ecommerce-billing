import api from './api.js'

export const registerUser = async (payload) => {
  const { data } = await api.post('/auth/register.php', payload)
  return data
}

export const loginUser = async (payload) => {
  const { data } = await api.post('/auth/login.php', payload)
  return data
}
