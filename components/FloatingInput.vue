<script>
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ToastAndroid } from 'react-native'
import store from '../store'
import { getAuthUid } from '../services/auth_getUid'

export default {
  props: {
    visible: Boolean,
    closeSheet: Function,
    itemColor: String
  },

  components: {
    Icon,
  },

  data: () => ({
    newTask: '',
  }),

  computed: {
    selectCategoryID: () => store.state.selectCategoryID,
  },

  methods: {
    async _addTask() {
      if (this.newTask !== '') {
        const { id } = await getAuthUid()

        store.commit('createTask', {
          categoryRef: this.selectCategoryID,
          title: this.newTask,
          description: '',
          done: false,
          userID: id,
          categoryID: this.selectCategoryID,
        })

        ToastAndroid.show(
          'Task add successfully :)',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )

        this.newTask = ''
      } else {
        ToastAndroid.show(
          'Add a new task',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }
    },
  },
}
</script>

<template>
  <modal
    :isOpen="visible"
    :onClosed="closeSheet"
    class="modal"
    position="bottom"
    :animationDuration="200"
    :backdropOpacity="0.3"
    backButtonClose
  >
    <view class="form-container">
      <text-input
        :defaultValue="newTask"
        :onChangeText="txt => (newTask = txt)"
        placeholder="Write new taks for today..."
        returnKeyType="next"
        :onSubmitEditing="_addTask"
        :style="{ fontFamily: 'balooBhai2', flex: 1 }"
      />
      <ripple 
        :onPress="_addTask"
        :rippleContainerBorderRadius="50"
        :disabled="!newTask"
        class="icon-container"
      >
        <icon name="send" :size="23"  :style="[{ color: !newTask ? '#c7c7c7' : itemColor }]" />
      </ripple>
    </view>
  </modal>
</template>

<style>
.modal {
  background-color: #f7f6ff;
  height: 50;
  top: -20;
  width: 95%;
  border-radius: 20;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 90%;
  flex-direction: row;
  align-items: center;
}

.icon-container {
  width: 40;
  height: 40;
  align-items: center;
  justify-content: center;
}
</style>
