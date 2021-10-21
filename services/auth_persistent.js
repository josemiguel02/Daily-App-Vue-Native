import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

const AUTH_KEY = 'auth_user'

// Get Current User Logged In
export async function getIsUserLogin() {
  const user = await AsyncStorage.getItem(AUTH_KEY)
  const parsed = JSON.parse(user)
  if (parsed == null) {
    return false
  } else {
    return true
  }
}

// Save Credentials
export function saveUserLogIn(data) {
  AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data))
    .then(() => {})
    .catch(error => console.log(error))
}

// Get User Data Logged In
export async function getUserDataLoggedIn() {
  const result = { userData: null, statusResponse: null, error: null }
  try {
    const user = await AsyncStorage.getItem(AUTH_KEY)
    result.statusResponse = true
    const parsed = JSON.parse(user)
    result.userData = parsed
  } catch (error) {
    console.log(error)
    result.statusResponse = false
    result.error = error
  }

  return result
}

// User LogOut Session
export async function logoutSession() {
  const { userData } = await getUserDataLoggedIn()

  try {
    await AsyncStorage.clear()

    if (userData.id) {
      await GoogleSignin.signOut()
    } else {
      await auth().signOut()
    }
  } catch (error) {
    console.log(error)
  }
}
