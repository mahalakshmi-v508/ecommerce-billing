import api from './api'

export const updateProfile = async (
  data
) => {

  const response =
    await api.post(
      '/profile/update_profile.php',
      data
    )

  return response.data
}

export const getProfile = async (id) => {

  const response = await api.get(
    `/profile/get_profile.php?id=${id}`
  )

  return response.data
}