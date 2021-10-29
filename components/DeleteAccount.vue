<script>
import { deleteUser } from '../services/auth_actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions } from 'react-native'
import { deleteDataOfUser } from '../services/auth_data_delete'
import { ToastAndroid } from 'react-native'

export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
    doLogout: Function,
  },

  data: () => ({
    width: (Dimensions.get('window').width * 80) / 100,
    btnLoading: false,
  }),

  methods: {
    async deleteAccount() {
      this.btnLoading = true
      const { statusResponse, error } = await deleteUser()
      if (statusResponse) {
        this.doLogout()
        await AsyncStorage.clear()
        setTimeout(() => {
          deleteDataOfUser()
        }, 5000)
      } else {
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        console.log(error)
        this.btnLoading = false
      }
    },
  },
}
</script>

<template>
  <modal
    :style="{ width, height: 'auto' }"
    :isOpen="visible"
    class="dialog"
    :animationDuration="200"
    :onClosed="closeDialog"
  >
    <view class="line" />

    <view class="container">
      <text class="title">Delete Account</text>

      <text class="text"
        >Are you sure to delete your account and lose all your data?</text
      >
    </view>
    <view class="btn-container">
      <mb-button
        :onPress="() => (visible = !visible)"
        :radius="20"
        type="outlined"
        :borderSize="1"
        textColor="#ef4c4c"
        text="Cancel"
      />
      <mb-button
        :onPress="deleteAccount"
        :loading="btnLoading"
        :radius="20"
        useInputCasing
        type="flat"
        text="Yes, sure!"
        color="#ef4c4c"
        :style="{ marginLeft: 14 }"
      />
    </view>
  </modal>
</template>

<style>
.dialog {
  border-radius: 20;
  background-color: #f7f6ff;
  padding: 24;
  align-items: center;
  justify-content: center;
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

.container {
  margin-top: 8;
}

.title {
  font-size: 24;
  font-family: balooBhai2SemiBold;
  color: #ef4c4c;
  text-align: center;
}

.text {
  font-size: 16;
  font-family: balooBhai2;
  margin-top: 10;
}

.btn-container {
  align-self: flex-end;
  flex-direction: row;
  margin-top: 25;
}
</style>
