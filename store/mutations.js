import firebase from '../services/firebase'
import { getAuthUid } from '../services/auth_getUid'

// Reference Firestore
const fire = firebase.firebase.firestore()
// All DB
const { dbTodoList, dbCategories, dbUsers } = firebase


export const setTasks = async (state) => {
  // Cleaning tasks
  state.tasks = []
  //Set Loading
  state.loading = true

  const { id } = await getAuthUid()

  const taskRef = dbTodoList.where('userID', '==', id).orderBy('title', 'asc')

  taskRef.onSnapshot(async (query) => {
    state.tasks = await Promise.all(
      query.docs.map(async (doc) => {
        const { title, description, userID, done, categoryRef } = doc.data()
        const categoryData = await categoryRef.get()
        return ({
          id: doc.id,
          title,
          description,
          userID,
          done,
          categoryID: categoryData.id,
          ...categoryData.data()
        })
      })
    )
    
    // Hide loading
    state.loading = false

    // Get Completed Task
    let taskDone = state.tasks.filter(x => x.done == true)
    state.doneTask = taskDone.length

    // Get Total Tasks
    state.totalTasK = query.docs.length

    // Set Empty Tasks
    if (!query.docs.length) {
      state.emptyTask = true
    } else {
      state.emptyTask = false
    }

  }, error => console.log(error))
}


export const createTask = async (state, addParams) => {
  const { 
    categoryRef, 
    title, 
    description, 
    done, 
    userID,
    categoryID
  } = addParams

  const categRef  = fire.doc(`/categories-list/${categoryRef}`)

  try {
    await dbTodoList.add({
      categoryRef: categRef,
      title,
      description,
      done,
      userID,
      categoryID
    })
  
    const increment = firebase.firebase.firestore.FieldValue.increment(1)
  
    await dbCategories.doc(categoryID).update({
      countTasks: increment
    })
  } catch (error) {
    console.log(error)
  }
}


export async function editTask(state, editParams) {
  const { id, title, description } = editParams

  await dbTodoList.doc(id).update({
    title,
    description,
  })
}


export const deleteTask = async (state, deleteParams) => {
  const { id, categoryID } = deleteParams

  const decrement = firebase.firebase.firestore.FieldValue.increment(-1)

  try {
    await dbTodoList.doc(id).delete()

    await dbCategories.doc(categoryID).update({
      countTasks: decrement
    })

  } catch (error) {
    console.log(error)
  }

}


export const makeDone = async (state, doneParams) => {
  const { id, itsDone } = doneParams

  await dbTodoList.doc(id).update({
    done: itsDone
  })
}



// Users Data of Firestore
export const getUserDataOfFireStore = async (state) => {
  const { id } = await getAuthUid()

  dbUsers.doc(id).onSnapshot(item => {
    state.users = item.data()
  }, error => console.log(error))
}


// Users Data of Firestore Edit
export const editDataUser = async (state, dataUpdate) => {
  try {
    const { id } = await getAuthUid()
    await dbUsers.doc(id).update(dataUpdate)
  } catch (error) {
    console.log(error)
  }
}


// Get Task Categories
export const getTasksCategories = async (state) => {
  const { id } = await getAuthUid()

  dbCategories.where('userID', '==', id)
    .orderBy('name_category', 'asc')
    .onSnapshot(query => {
      // Set Categories
      state.tasksCategory = query.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }, error => console.log(error))
}




// Add Categories
export const addCategory = async (state, newCategory) => {
  try {
    await dbCategories.add(newCategory)
  } catch (error) {
    console.log(error)
  }
}

export const clearCategorySelect = (state) => {
  state.selectCategory = {
    id: '',
    name_category: '',
    color: '',
  }
}


export const setSelect = (state, select) => {
  const { id, name_category, color } = select
  state.selectCategory = {
    id,
    name_category,
    color,
  }
}


export const switchToggleDropdown = (state, status) => {
  state.toggleDropdown = status
};

// Cleanig Task for Loggin User
export const clearTasksAndCategorySelect = (state) => {
  state.tasks = []
  state.selectCategory = {
    id: '',
    name_category: '',
    color: '',
  }
}


//SingleTasksForCategory
export const getSingleTasksForCategory = async (state, categoryID) => {
  state.tasksForCategory = []

  dbTodoList
    .where('categoryID', '==', state.selectCategoryID)
    .onSnapshot(async query => {
      state.tasksForCategory = await Promise.all(
        query.docs.map(async doc => {
          const { title, description, userID, done, categoryRef } = doc.data()
          const categoryData = await categoryRef.get()

          return {
            id: doc.id,
            title,
            description,
            userID,
            done,
            categoryID: categoryData.id,
            ...categoryData.data(),
          }
        })
      )
  })
}

export const setCategoryID = (state, id) => {
  state.selectCategoryID = id
}
