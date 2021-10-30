import { dbUsers, dbTodoList, dbCategories } from './firebase'
import storage from '@react-native-firebase/storage'
import store from '../store'

export const deleteDataOfUser = async () => {
  const { uid } = store.state.users

  try {
    await dbUsers.doc(uid).delete()

    const tasksRef = await dbTodoList.where('userID', '==', uid).get()
    tasksRef.forEach(doc => {
      doc.ref.delete()
    })

    const categoryRef = await dbCategories.where('userID', '==', uid).get()
    categoryRef.forEach(doc => {
      doc.ref.delete()
    })

    // Delete Photo of User
    const storageRef = storage().ref()
    const photoRef = storageRef.child(`/photos/${uid}`)
    photoRef.listAll().then(res => {
      if (res.items.length) {
        res.items.forEach(item => {
          item.delete()
        })
      }
    }).catch(e => console.log(e))
  } catch ({ message }) {
    console.log(message)
  }
}
