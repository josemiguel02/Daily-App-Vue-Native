<script>
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ToastAndroid } from 'react-native'
import store from '../store'
import { getAuthUid } from '../services/auth_getUid'

export default {
  props: {
    visible: Boolean,
    closeSheet: Function,
  },

  components: { Icon },

  data: () => ({
    newTask: ''
  }),

  methods: {
    async _addTask() {
      const { id } = this.selectCategory
      if (id !== '' && this.newTask !== '') {
        const result = await getAuthUid()

        store.commit('createTask', {
          categoryRef: id,
          title: this.newTask,
          description: '',
          done: false,
          userID: result.id,
          categoryID: id,
        })

        ToastAndroid.show(
          'Task add successfully :)',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )

        this.newTask = ''
      } else {
        ToastAndroid.show(
          'Select a category and enter a task',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }
    },

    handlerToggle() {
      store.commit('switchToggleDropdown', true)
    },
  },

  computed: {
    categories: () => store.state.tasksCategory,
    toggleDropdown: () => store.state.toggleDropdown,
    selectCategory: () => store.state.selectCategory,
  }
}
</script>

<template>
  <modal
    :isOpen="visible"
    :onClosed="closeSheet"
    class="container"
    :style="{ top: toggleDropdown ? '-27%' : -12 }"
    position="bottom"
    :animationDuration="200"
    backButtonClose
  >
    <!-- Add Task Form -->
    <view class="form-container">
      <text-input
        :defaultValue="newTask"
        :onChangeText="txt => (newTask = txt)"
        placeholder="Write new tasks for today..."
        returnKeyType="next"
        :onSubmitEditing="_addTask"
        :style="{ fontFamily: 'balooBhai2', flex: 1, paddingHorizontal: 10 }"
      />

      <!-- DropDown -->
      <ripple
        :onPress="handlerToggle"
        class="dropdown-container"
        :rippleContainerBorderRadius="12"
      >
        <view class="dropdown-horizontal">
          <view
            :style="[{ borderColor: selectCategory.id ? selectCategory.color : '#c7c7c7' }]"
            class="circle"
          />
          <text class="dropdown-name" :numberOfLines="1">
            {{ !selectCategory.name_category 
                ? 'No list'
                : selectCategory.name_category
            }}
          </text>
        </view>
        
        <icon
          :name="[toggleDropdown ? 'chevron-up' : 'chevron-down']"
          :size="19"
        />
      </ripple>
    </view>
  </modal>
</template>

<style>
.container {
  width: 95%;
  height: 50;
  border-radius: 20;
  background-color: #f7f6ff;
  align-items: center;
  justify-content: center;
  padding-horizontal: 5;
}

.form-container {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20;
}

.dropdown-container {
  background-color: #efeff0;
  padding: 10;
  border-radius: 12;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 115;
  height: 38;
}

.dropdown-horizontal {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2.7;
  border-radius: 5;
  margin-right: 10;
}

.dropdown-name {
  font-family: balooBhai2;
  max-width: 50;
}
</style>
