import firebase from './firebase.js'

const userColletion = firebase.dbUsers

export const updateUserProfile = (userId, dataUpdate) => {
  try {
    userColletion.doc(userId).update(dataUpdate).then(() => {})
  } catch (error) {
    console.log(error)
  }
}
