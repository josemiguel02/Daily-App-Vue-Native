import { dbCategories, dbUsers, firestore } from './firebase'
import auth from '@react-native-firebase/auth'
import { getCredentials, saveUserLogIn } from './auth_persistent'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

// Register User
export async function registerUser (email, password, newName) {
  const result = { statusResponse: true, error: null }

  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    )
    // Get User ID
    const userID = user.uid

    // Get User Data
    const userData = {
      uid: userID,
      name: newName,
      email: user.email,
      phone: null,
      photo: null,
      createAt: firestore.Timestamp.fromDate(new Date())
    }

    // Save User Data in Firestore
    await dbUsers.doc(userID).set(userData)
    // Add Category Default
    await dbCategories.add({
      userID,
      name_category: 'Predetermined',
      color: '#4385f5',
      emoji: '🚀',
      countTasks: 0
    })
  } catch ({ message }) {
    console.log(message)
    result.statusResponse = false
    result.error = message
  }

  return result
}

// Get Current User
export function getCurrentUser () {
  return auth().currentUser
}

// Login with email and password
export async function loginEmailPassword (email, password) {
  const result = { user: null, statusResponse: true, error: null }

  try {
    await auth().signInWithEmailAndPassword(email, password)
    const usuario = getCurrentUser()
    // Save Crendetials in Async Storage
    saveUserLogIn(usuario)
    result.user = usuario
  } catch ({ message }) {
    console.log(message)
    result.statusResponse = false
    result.error = message
  }

  return result
}

export async function deleteUser () {
  const result = { statusResponse: null, error: null }

  try {
    const user = getCurrentUser()
    const userProvider = user.providerData[0].providerId

    if (userProvider === 'google.com') {
      const { idToken } = await GoogleSignin.signInSilently()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      await auth().signInWithCredential(googleCredential)
    } else {
      const { email, password } = await getCredentials()

      const credential = auth.EmailAuthProvider.credential(
        email,
        password
      )
      await user.reauthenticateWithCredential(credential)
    }

    await user.delete()
    result.statusResponse = true
  } catch ({ message }) {
    result.statusResponse = false
    result.error = message
  }

  return result
}
