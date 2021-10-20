import firebase from './firebase.js'

const { dbUsers } = firebase

export const updateUserProfile = (userId, dataUpdate) => {
  try {
    dbUsers.doc(userId).update(dataUpdate).then(() => {})
  } catch (error) {
    console.log(error)
  }
}
