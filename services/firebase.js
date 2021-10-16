import firebase from 'firebase'
import 'firebase/firestore'
/* import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} from '@env' */

const firebaseConfig = {
  apiKey: 'AIzaSyDaytzmnmRlY2oFuyHKAS_sSV27Z0mbYz0',
  authDomain: 'vue-tasks-crud.firebaseapp.com',
  projectId: 'vue-tasks-crud',
  storageBucket: 'vue-tasks-crud.appspot.com',
  messagingSenderId: '867803263886',
  appId: '1:867803263886:web:49031353f230e7ec64aadf',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// DB of Tasks
const dbTodoList = firebase.firestore().collection('todo-list')

// DB of Categories
const dbCategories = firebase.firestore().collection('categories-list')

// DB of Users
const dbUsers = firebase.firestore().collection('users')

export default {
  firebase,
  dbTodoList,
  dbUsers,
  dbCategories,
}
