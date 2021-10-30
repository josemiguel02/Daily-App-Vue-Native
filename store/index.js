import Vue from 'vue-native-core'
import Vuex from 'vuex'
import * as mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasks: [],
    tasksForCategory: [],
    loading: false,
    users: {},
    totalTasK: 0,
    doneTask: 0,
    tasksCategory: [],
    loadingTaskCateg: false,
    selectCategory: {
      id: '',
      name_category: '',
      color: ''
    },
    toggleDropdown: false,
    selectCategoryID: '',
    selectIndex: 0
  },

  mutations
})

export default store
