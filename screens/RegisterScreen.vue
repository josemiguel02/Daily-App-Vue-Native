<script>
import Icon from 'react-native-vector-icons/FontAwesome5'
import { registerUser } from '../services/auth_actions.js'
import { ToastAndroid } from 'react-native'

export default {
  data: () => ({
    loadingBtn: false,
    newUser: {
      name: '',
      email: '',
      password: '',
    },
    showPassword: true,
  }),

  components: { Icon },

  methods: {
    async _registerUser() {
      let { name, email, password } = this.newUser

      if (name && email && password) {
        this.loadingBtn = true
        const { statusResponse, error} = await registerUser(email, password, name)

        if (!statusResponse) {
          ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
          this.loadingBtn = false
          return
        }

        this.newUser.name = ''
        this.newUser.email = ''
        this.newUser.password = ''

        ToastAndroid.show(
          'User Register successfuly',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
        this.loadingBtn = false
      } else {
        ToastAndroid.show(
          'Fields required',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }
    },
  },
}
</script>

<template>
  <view class="container">
    <!-- Register View -->
    <view class="register-view">
      <view :style="{ padding: 30 }">
        <!-- Register Form View -->
        <view>
          <!-- Name -->
          <view class="form-input" :style="{ marginBottom: 24 }">
            <icon name="user-alt" :style="{ marginRight: 10 }" :size="15" />
            <text-input
              :defaultValue="newUser.name"
              :onChangeText="input => (newUser.name = input)"
              class="input"
              placeholder="Full Name"
            />
          </view>

          <!-- Email -->
          <view class="form-input" :style="{ marginBottom: 24 }">
            <icon name="at" :style="{ marginRight: 10 }" :size="15" />
            <text-input
              :defaultValue="newUser.email"
              :onChangeText="input => (newUser.email = input)"
              autoCompleteType="username"
              autoCapitalize="none"
              class="input"
              placeholder="example@gmail.com"
              keyboardType="email-address"
            />
          </view>

          <view class="form-input">
            <icon name="lock" :style="{ marginRight: 10 }" :size="15" />
            <text-input
              :defaultValue="newUser.password"
              :onChangeText="input => (newUser.password = input)"
              autoCompleteType="password"
              :secureTextEntry="showPassword"
              class="input"
              placeholder="example12345"
            />
            <ripple
              :onPress="() => (showPassword = !showPassword)"
              :rippleContainerBorderRadius="20"
              class="ripple"
            >
              <icon :name="[showPassword ? 'eye' : 'eye-slash']" :size="15" />
            </ripple>
          </view>

          <!-- Register Button -->
          <view :style="{ marginTop: 26 }">
            <mb-button
              :onPress="_registerUser"
              fullWidth
              :loading="loadingBtn"
              text="Register"
              type="flat"
              :radius="17"
              color="#4385f5"
              :style="{ height: 42 }"
              useInputCasing
              :textStyle="{ fontFamily: 'raleway' }"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.register-view {
  margin-horizontal: 10;
}

.form-input {
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 20;
  padding-horizontal: 15;
  height: 50;
  border-width: 0.2;
  border-color: #bbbbbb3d;
}

.input {
  flex: 1;
  font-family: ralewayMedium;
}

.ripple {
  width: 35;
  height: 35;
  align-items: center;
  justify-content: center;
}
</style>
