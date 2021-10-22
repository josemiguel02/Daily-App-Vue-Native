import { dbCategories, dbUsers, firestore } from './firebase'
import auth from '@react-native-firebase/auth'
import { saveUserLogIn } from './auth_persistent'

// Register User
export async function registerUser(email, password, newName) {
  const result = { statusResponse: true, error: null }

  try {
    const createUser = await auth().createUserWithEmailAndPassword(
      email,
      password
    )

    // Update name of user
    await createUser.user.updateProfile({
      displayName: newName,
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
      phone: null,
      photo: null,
      createAt: firestore.Timestamp.fromDate(new Date()),
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
  } catch (error) {
    console.log(error.message)
    result.statusResponse = false
    result.error = error.message
  }

  return result
}

// Get Current User
export function getCurrentUser() {
  return auth().currentUser
}

// Login with email and password
export async function loginEmailPassword(email, password) {
  const result = { user: null, statusResponse: true, error: null }

  try {
    await auth().signInWithEmailAndPassword(email, password)
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