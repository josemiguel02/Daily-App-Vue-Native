import firebase from './firebase.js'
import * as Google from 'expo-google-app-auth'
import { saveUserLogIn } from './auth_persistent'
import { config } from '../utils/auth_config.js'

const fire = firebase.firebase

const { dbCategories, dbUsers } = firebase

// Register User
export async function registerUser (email, password, newName) {
  const result = { statusResponse: true, error: null }

  try {
    const createUser = await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)

    // Update name of user
    await createUser.user.updateProfile({
      displayName: newName
    })

    // Get User register
    const user = createUser.user

    // Get User ID
    const userID = user.uid

    // Get User Data
    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phone: user.phoneNumber,
      photo: user.photoURL,
      createAt: fire.firestore.Timestamp.fromDate(new Date())
    }

    // Save User Data in Firestore
    dbUsers.doc(userID).set(userData)
    // Add Catefory Default
    dbCategories.add({
      userID,
      name_category: 'Predetermined',
      color: '#4385f5',
      emoji: '🚀'
    })
  } catch (error) {
    console.log(error.message)
    result.statusResponse = false
    result.error = error.message
  }

  return result
}

// Get Current User
export function getCurrentUser () {
  return fire.auth().currentUser
}

// Login with email and password
export async function loginEmailPassword (email, password) {
  const result = { user: null, statusResponse: true, error: null }

  try {
    await fire.auth().signInWithEmailAndPassword(email, password)
    const usuario = getCurrentUser()
    // Save Crendetials in Async Storage
    saveUserLogIn(usuario)
    result.user = usuario
  } catch (error) {
    result.statusResponse = false
    result.error = error.message
  }

  return result
}

// Login with Google
export async function loginWithGoogle () {
  const result = { usuario: null, statusResponse: true, error: null }

  try {
    const { type, user } = await Google.logInAsync(config)

    if (type === 'success') {
      // Save Crendetials in Async Storage
      saveUserLogIn(user)

      // Get User Data
      const userGoogleData = {
        uid: user.id,
        name: user.name,
        email: user.email,
        phone: null,
        photo: null,
        createAt: fire.firestore.Timestamp.fromDate(new Date())
      }

      const docRef = await dbUsers.doc(user.id).get()

      if (!docRef.exists) {
        // Save User Data in Firestore
        dbUsers.doc(user.id).set(userGoogleData)

        // Add Catefory Default
        dbCategories.add({
          userID: user.id,
          name_category: 'Predetermined',
          color: '#4385f5',
          emoji: '🚀'
        })
      }

      result.usuario = user
    } else {
      console.log('Google SignIn Cancel')
      result.statusResponse = false // clave
    }
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }

  return result
}
