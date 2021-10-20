import firestore from '@react-native-firebase/firestore'

export const testDB = firestore().collection('prueba')

// DB of Tasks
const dbTodoList = firestore().collection('todo-list')

// DB of Categories
const dbCategories = firestore().collection('categories-list')

// DB of Users
const dbUsers = firestore().collection('users')

export default {
  firestore,
  dbTodoList,
  dbUsers,
  dbCategories,
}
