<script>
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dimensions, ToastAndroid } from 'react-native'
import store from '../store'
import { getAuthUid } from '../services/auth_getUid'

export default {
  props: {
    visible: Boolean,
    closeSheet: Function,
  },

  components: { Icon },

  data: () => ({
    newTask: '',
    height: (Dimensions.get('window').height * 20) / 100,
    isFocused: false,
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
    selectCategoryID: () => store.state.selectCategoryID,
  },
}
</script>

<template>
  <modal
    :isOpen="visible"
    class="bottom-sheet"
    :style="{ top: toggleDropdown ? '-27%' : -12, height }"
    position="bottom"
    :animationDuration="200"
    :onClosed="() => {
      closeSheet()
      isFocused = false
    }"
    backButtonClose
  >
    <view class="line" />
    <!-- Add Task Form -->
    <view class="bottom-sheet_wrapper">
      <text-input
        placeholder="Write new taks for today"
        class="bottom-sheet_input"
        :defaultValue="newTask"
        :onChangeText="txt => newTask = txt"
      />

      <view
        :style="{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }"
      >
        <ripple
          :onPress="handlerToggle"
          :style="{ width: '70%' }"
          class="dropdown-header"
          :rippleContainerBorderRadius="12"
        >
          <view
            :style="{ flexDirection: 'row', alignItems: 'center' }"
          >
            <view
              :style="[{
                borderColor: selectCategory.id ? selectCategory.color : '#c7c7c7',
              }]"
              class="circle"
            />
            <text :style="{ maxWidth: '80%', fontFamily: 'balooBhai2'}"
              :numberOfLines="1"
            >
              {{
                selectCategory.name_category == ''
                  ? 'Select a category...'
                  : selectCategory.name_category
              }}
            </text>
          </view>

          <icon
            :name="[toggleDropdown ? 'chevron-up' : 'chevron-down']"
            :size="18"
          />
        </ripple>

        <ripple
          :onPress="_addTask"
          :rippleContainerBorderRadius="50"
          :style="{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }"
          :disabled="(newTask && selectCategory.id) == ''"
        >
          <icon name="send" class="add-icon"
            :style="[{
              color: (newTask && selectCategory.id) ? '#4385f5': '#c7c7c7'
            }]"
           />
        </ripple>
      </view>
    </view>
  </modal>
</template>

<style>
.bottom-sheet {
  width: 95%;
  border-radius: 15;
  background-color: #f7f6ff;
  padding-horizontal: 20;
}

.line {
  position: absolute;
  top: 6;
  align-self: center;
  background-color: #c7c7c7;
  width: 40;
  height: 6;
  border-radius: 20;
}

.bottom-sheet_wrapper {
  margin-top: 10%;
}

.bottom-sheet_input {
  font-size: 15;
  background-color: #fff;
  padding-horizontal: 14;
  height: 40%;
  width: 100%;
  border-radius: 17;
  border-width: 0.2;
  border-color: #bbbbbb3d;
  font-family: balooBhai2;
}

.bottom-sheet_btn {
  width: 30%;
}

.add-icon {
  /* color: #4385f5; */
  font-size: 23;
}

.dropdown-header {
  background-color: #efeff0;
  padding: 10;
  border-radius: 12;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2.7;
  border-radius: 5;
  margin-right: 10;
}
</style>
