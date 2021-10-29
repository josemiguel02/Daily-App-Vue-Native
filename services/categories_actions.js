import { dbTodoList, dbCategories } from './firebase'

export const deleteCategory = async (categoryID) => {
  await dbCategories.doc(categoryID).delete()

  // Delete task with category
  const taskRef = await dbTodoList.where('categoryID', '==', categoryID).get()
  taskRef.forEach(doc => {
    doc.ref.delete()
  })
}

export const editCategory = async (categoryID, dataEdit) => {
  await dbCategories.doc(categoryID).update(dataEdit)
}
