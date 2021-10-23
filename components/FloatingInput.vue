<script>
import { ToastAndroid } from 'react-native'
import store from '../store'
import { getAuthUid } from '../services/auth_getUid'

export default {
  props: {
    visible: Boolean,
    closeSheet: Function,
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
        :onChangeText="txt => newTask = txt"
        placeholder="Write new taks for today..."
        returnKeyType="next"
        :onSubmitEditing="_addTask"
        :style="{ fontFamily: 'ralewayMedium' }"
      />
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
}
</style>