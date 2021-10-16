import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from './firebase.js'

const AUTH_KEY = 'auth_user'

// Get Current User Logged In
export async function getIsUserLogin () {
  const user = await AsyncStorage.getItem(AUTH_KEY)
  const parsed = JSON.parse(user)
  if (parsed == null) {
    return false
  } else {
    return true
  }
}

// Save Credentials
export function saveUserLogIn (data) {
  AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data))
    .then(() => {})
    .catch(error => console.log(error))
}

// Get User Data Logged In
export async function getUserDataLoggedIn () {
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
export async function logoutSession () {
  const fire = firebase.firebase

  try {
    await AsyncStorage.clear()
    await fire.auth().signOut()
  } catch (error) {
    console.log(error)
  }
}
