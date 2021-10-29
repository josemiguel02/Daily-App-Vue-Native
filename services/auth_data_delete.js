import { dbUsers, dbTodoList, dbCategories } from './firebase'
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
  } catch ({ message }) {
    console.log(message)
  }
}
