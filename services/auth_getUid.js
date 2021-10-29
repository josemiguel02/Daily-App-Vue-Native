import { getUserDataLoggedIn } from './auth_persistent'

export const getAuthUid = async () => {
  const { statusResponse, userData } = await getUserDataLoggedIn()
  const result = { id: null }

  if (statusResponse) {
    result.id = userData.uid ? userData.uid : userData.id
  } else {
    console.log('There is no user id logged in')
  }

  return result
}
