<script>
import store from '../store'
import { loginEmailPassword } from '../services/auth_actions.js'
import { loginWithGoogle } from '../services/google_auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default {
  props: {
    doLogin: Function,
  },

  data: () => ({
    email: '',
    password: '',
    showPassword: true,
    loadingBtn: false,
  }),

  components: {
    Icon,
    SafeAreaView,
  },

  methods: {
    async _loginWithEmailPass() {
      if (this.email && this.password) {
        this.loadingBtn = true
        const { statusResponse, error } = await loginEmailPassword(
          this.email,
          this.password
        )

        if (!statusResponse) {
          ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
          this.loadingBtn = false
          return
        }

        store.commit('clearTasksAndCategory')
        this.doLogin()
      } else {
        ToastAndroid.show(
          'Fields required',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }
    },

    async _loginWithGoogle() {
      this.loadingBtn = true
      const { statusResponse, error } = await loginWithGoogle()

      if (!statusResponse) {
        this.loadingBtn = false
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
      } else {
        store.commit('clearTasksAndCategory')
        this.doLogin()
      }
    },
  },
}
</script>

<template>
  <view class="container">
    <!-- Login View -->
    <view class="login-view">
      <view :style="{ padding: 30 }">
        <!-- Login Form View -->
        <view>
          <view class="form-input" :style="{ marginBottom: 24 }">
            <icon name="at" :style="{ marginRight: 10 }" :size="15" />
            <text-input
              :defaultValue="email"
              :onChangeText="input => (email = input)"
              autoCompleteType="username"
              class="input"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </view>

          <view class="form-input">
            <icon name="lock" :style="{ marginRight: 10 }" :size="15" />
            <text-input
              :defaultValue="password"
              :onChangeText="input => (password = input)"
              autoCompleteType="password"
              :secureTextEntry="showPassword"
              class="input"
              placeholder="Password"
            />
            <ripple
              :onPress="() => (showPassword = !showPassword)"
              :rippleContainerBorderRadius="20"
              class="ripple"
            >
              <icon :name="[showPassword ? 'eye' : 'eye-slash']" :size="15" />
            </ripple>
          </view>

          <!-- Login Button -->
          <view :style="{ marginTop: 26 }">
            <mb-button
              :onPress="_loginWithEmailPass"
              fullWidth
              :loading="loadingBtn"
              text="Login"
              type="flat"
              color="#4385f5"
              :radius="17"
              useInputCasing
              :textStyle="{ fontFamily: 'balooBhai2', fontSize: 16, letterSpacing: 0.6 }"
              :style="{ height: 42 }"
            />
          </view>

          <!-- Login With Google -->
          <view :style="{ marginTop: 22 }">
            <mb-button
              :onPress="_loginWithGoogle"
              :style="{ height: 42, elevation: 0.3 }"
              type="flat"
              :radius="17"
              color="#fff"
              fullWidth
            >
              <image
                :style="{ width: 28, height: 28 }"
                :source="require('../assets/googleLogo.png')"
              />
              <text :style="{ marginLeft: 10, fontFamily: 'balooBhai2SemiBold', letterSpacing: 0.6 }">
                Continue with Google
              </text>
            </mb-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.login-view {
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
  font-family: balooBhai2;
}

.ripple {
  width: 35;
  height: 35;
  align-items: center;
  justify-content: center;
}
</style>
