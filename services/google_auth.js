import firebase from './firebase.js'
import { saveUserLogIn } from './auth_persistent'
import auth from '@react-native-firebase/auth'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { config } from '../utils/auth_google_config'

const { dbCategories, dbUsers, firestore } = firebase

GoogleSignin.configure(config)

export const loginWithGoogle = async () => {
  const result = { usuario: null, statusResponse: true, error: null }

  try {
    await GoogleSignin.hasPlayServices()

    const { idToken, user } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    await auth().signInWithCredential(googleCredential)

    saveUserLogIn(user)

    // Get User Data
    const userGoogleData = {
      uid: user.id,
      name: user.name,
      email: user.email,
      phone: null,
      photo: user.photo,
      createAt: firestore.Timestamp.fromDate(new Date()),
    }

    const docRef = await dbUsers.doc(user.id).get()

    if (!docRef.exists) {
      // Save User Data in Firestore
      await dbUsers.doc(user.id).set(userGoogleData)

      // Add Category Default
      await dbCategories.add({
        userID: user.id,
        name_category: 'Predetermined',
        color: '#4385f5',
        emoji: '🚀',
      })
    }

    result.usuario = user
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      result.statusResponse = false
      result.error = 'Google SignIn Cancel'
    } else if (error.code === statusCodes.IN_PROGRESS) {
      result.statusResponse = false
      result.error = 'In progress'
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      result.statusResponse = false
      result.error = 'Play services not available'
    } else {
      result.statusResponse = false
      result.error = error
    }
  }

  return result
}
