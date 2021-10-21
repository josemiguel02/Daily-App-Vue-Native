import { getUserDataLoggedIn } from './auth_persistent'

export const isGoogleUser = async () => {
  const result = { isUserGoogle: null }

  const { statusResponse, userData } = await getUserDataLoggedIn()

  if (statusResponse) {
    result.isUserGoogle = userData.uid ? 'normal user' : 'google user'
  } else {
    console.log('There is no logged user data')
  }

  return result
}
