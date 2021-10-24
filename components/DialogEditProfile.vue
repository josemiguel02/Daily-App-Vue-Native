<script>
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Dimensions } from 'react-native'
import store from '../store';

export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
  },
  components: { Icon },

  data: () => ({
    width: Dimensions.get('window').width * 80 / 100,
    height: Dimensions.get('window').height * 30 / 100,
    updateData: {
      name: '',
      phone: '',
    },
    showDialog: true,
    btnDisabled: false,
    isFocused: false,
    isFocused2: false,
  }),

  computed: {
    user: () => store.state.users,
  },

  methods: {
    updateDataProfile() {
      const { name, phone } = this.updateData
      
      if (name !== '' || phone !== '') {
        store.commit('editDataUser', {
          name: name == '' ? this.user.name : name,
          phone: phone == '' ? this.user.phone : phone,
        })
      }
      this.visible = !this.visible
    }
  },
}
</script>

<template>
  <modal
    :style="{width, height: 190}"
    :isOpen="visible"
    class="dialog"
    :animationDuration="220"
    :onClosed="() => {
      closeDialog()
      isFocused = false
      isFocused2 = false
    }"
  >
    <view class="line" />

    <!-- Edit Profile -->
    <view class="profile-form">
      <text-input
        :defaultValue="user.name"
        :onChangeText="txt => updateData.name = txt"
        class="profile-form_input"
        placeholder="Name"
        :onFocus='() => isFocused = true'
        :onBlur='() => isFocused = false'
        :style="[{ marginBottom: 20, 
          borderColor: isFocused ? '#4385f5' : '#c7c7c7'
        }]"
      />

      <text-input
        :defaultValue="user.phone"
        :onChangeText="txt => updateData.phone = txt"
        class="profile-form_input"
        placeholder="Phone number"
        keyboardType="numeric"
        :onFocus='() => isFocused2 = true'
        :onBlur='() => isFocused2 = false'
        :style="[{
          borderColor: isFocused2 ? '#4385f5' : '#c7c7c7'
        }]"
      />

      <view class="profile-form_submit">
        <mb-button
          :onPress="() => visible = !visible"
          :radius="20"
          type="outlined"
          text="Cancel"
          class="profile-form_btn"
          useInputCasing
          :textStyle="{ fontFamily: 'balooBhai2' }"
          :style="{ marginRight: 12, borderWidth: 0.8 }"
          textColor="#a240fd"
        />
        
        <mb-button
          :onPress="updateDataProfile"
          :radius="20"
          type="flat"
          text="Save Info"
          class="profile-form_btn"
          useInputCasing
          color="#35bff1"
          :textStyle="{ fontFamily: 'balooBhai2' }"
          :disabled="(updateData.name || updateData.phone) == ''"
        />
      </view>
    </view>
  </modal>
</template>

<style>
.dialog {
  border-radius: 20;
  background-color: #f7f6ff;
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

.profile-form {
  width: 100%;
  padding-horizontal: 30;
}

.profile-form_input {
  border-bottom-width: 1.5;
  font-family: balooBhai2;
}

.profile-form_submit {
  align-self: flex-end;
  flex-direction: row;
  margin-top: 20;
}
</style>
