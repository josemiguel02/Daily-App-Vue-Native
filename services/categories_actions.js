import firebase from './firebase.js'

// All DB
const { dbTodoList, dbCategories } = firebase

export const deleteCategory = async (categoryID) => {
  await dbCategories.doc(categoryID).delete()

  // Delete task with category
  const taskRef = await dbTodoList.where('categoryID', '==', categoryID).get()
  taskRef.forEach(element => {
    element.ref.delete()
  })
}

export const editCategory = async (categoryID, dataEdit) => {
  await dbCategories.doc(categoryID).update(dataEdit)
}
