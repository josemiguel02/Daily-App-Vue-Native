<script>
import store from '../store'
import { loginEmailPassword } from '../services/auth_actions.js'
import { setCredentials } from '../services/auth_persistent'
import { loginWithGoogle } from '../services/auth_google'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { validateEmail } from '../utils/validate_email'
import * as Animatable from 'react-native-animatable'
import Snackbar from 'react-native-snackbar'

export default {
  props: {
    doLogin: Function,
  },

  data: () => ({
    email: '',
    password: '',
    showPassword: true,
    loadingBtn: false,

    emailErrors: {
      show: false,
      message: '',
    },

    passwordErrors: {
      show: false,
      message: '',
    },
  }),

  components: {
    Icon,
    SafeAreaView,
    Animatable,
  },

  watch: {
    email(val) {
      if (!val) {
        this.emailErrors = {
          show: true,
          message: 'Email is required.',
        }
      } else if (validateEmail(val)) {
        this.emailErrors.show = false
      } else {
        this.emailErrors = {
          show: true,
          message: 'Enter a valid email address.',
        }
      }
    },

    password(val) {
      if (!val) {
        this.passwordErrors = {
          show: true,
          message: 'Password is required.',
        }
      } else if (val.length < 6) {
        this.passwordErrors = {
          show: true,
          message: 'Password must be at least 6 characters long.',
        }
      } else {
        this.passwordErrors.show = false
      }
    },
  },

  methods: {
    validateLogin() {
      if (!this.email) {
        this.emailErrors = {
          show: true,
          message: 'Email is required.',
        }
      }
      if (!this.password) {
        this.passwordErrors = {
          show: true,
          message: 'Password is required.',
        }
      }
      if (!this.emailErrors.show && !this.passwordErrors.show) {
        return true
      }
    },

    async _loginWithEmailPass() {
      const isValidate = this.validateLogin()

      if (isValidate) {
        this.loadingBtn = true
        const { statusResponse, error } = await loginEmailPassword(
          this.email,
          this.password
        )

        if (!statusResponse) {
          Snackbar.show({
            text: error,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red',
            fontFamily: 'BalooBhai2-Medium',
            action: {
              text: 'UNDO',
              textColor: '#fff'
            }
          })
          this.loadingBtn = false
          return
        }

        store.commit('clearAllUserData')
        this.doLogin()
        setCredentials({
          email: this.email,
          password: this.password,
        })
      }
    },

    async _loginWithGoogle() {
      this.loadingBtn = true
      const { statusResponse, error } = await loginWithGoogle()

      if (!statusResponse) {
        this.loadingBtn = false
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
      } else {
        store.commit('clearAllUserData')
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
        <view
          class="form-input"
          :style="[{
            borderWidth: emailErrors.show ? 1.5 : 0,
            borderColor: emailErrors.show ? 'red' : ''
          }]"
        >
          <icon name="at" :style="{ marginRight: 10, color: '#424242' }" :size="15" />
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

        <view class="validation-container">
          <animatable:text
            animation="shake"
            class="validation-text"
            v-if="emailErrors.show"
          >
            {{ emailErrors.message }}
          </animatable:text>
        </view>

        <view
          class="form-input"
          :style="[{
            marginTop: 20,
            borderWidth: passwordErrors.show ? 1.5 : 0,
            borderColor: passwordErrors.show ? 'red' : null
          }]"
        >
          <icon name="lock" :style="{ marginRight: 10, color: '#424242' }" :size="15" />
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
            <icon :name="[showPassword ? 'eye' : 'eye-slash']" :size="15"
              :style="{ color: '#424242' }"  
            />
          </ripple>
        </view>

        <view class="validation-container">
          <animatable:text
            animation="shake"
            class="validation-text"
            v-if="passwordErrors.show"
          >
            {{ passwordErrors.message }}
          </animatable:text>
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
            :textStyle="{
              fontFamily: 'balooBhai2',
              fontSize: 16,
              letterSpacing: 0.6,
            }"
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
            <text
              :style="{
                marginLeft: 10,
                fontFamily: 'balooBhai2SemiBold',
                letterSpacing: 0.6,
                color: '#424242'
              }"
            >
              Continue with Google
            </text>
          </mb-button>
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

.validation-container {
  padding-horizontal: 10;
  margin-top: 5;
  flex-wrap: wrap;
}

.validation-text {
  font-family: balooBhai2;
  color: red;
}
</style>
