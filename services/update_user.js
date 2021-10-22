import { dbUsers } from './firebase.js'

export const updateUserProfile = (userId, dataUpdate) => {
  try {
    dbUsers.doc(userId).update(dataUpdate).then(() => {})
  } catch (error) {
    console.log(error)
  }
}
