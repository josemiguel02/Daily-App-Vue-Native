<script>
import Icon from 'react-native-vector-icons/FontAwesome5'
import { registerUser } from '../services/auth_actions.js'
import { validateEmail } from '../utils/validate_email'
import * as Animatable from 'react-native-animatable'
import Snackbar from 'react-native-snackbar'

export default {
  data: () => ({
    loadingBtn: false,
    newUser: {
      name: '',
      email: '',
      password: '',
    },
    showPassword: true,
    nameErrors: {
      show: false,
      message: '',
    },
    emailErrors: {
      show: false,
      message: '',
    },
    passwordErrors: {
      show: false,
      message: '',
    },
  }),

  components: { Icon, Animatable },

  methods: {
    _validateName(val) {
      if (!val) {
        this.nameErrors = {
          show: true,
          message: 'Full Name is required.',
        }
      } else if (val.length < 8) {
        this.nameErrors = {
          show: true,
          message: 'Name must be at least 8 characters long.',
        }
      } else {
        this.nameErrors.show = false
      }
    },

    _validateEmail(val) {
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

    _validatePassword(val) {
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

    validateRegister() {
      const { name, email, password } = this.newUser
      if (!name) {
        this.nameErrors = {
          show: true,
          message: 'Full Name is required.',
        }
      }
      if (!email) {
        this.emailErrors = {
          show: true,
          message: 'Email is required.',
        }
      }
      if (!password) {
        this.passwordErrors = {
          show: true,
          message: 'Password is required.',
        }
      }
      if (
        !this.nameErrors.show &&
        !this.emailErrors.show &&
        !this.passwordErrors.show
      ) {
        return true
      }
    },

    async _registerUser() {
      const isValidate = this.validateRegister()

      if (isValidate) {
        this.loadingBtn = true
        const { name, email, password } = this.newUser
        const { statusResponse, error } = await registerUser(
          email,
          password,
          name
        )

        if (!statusResponse) {
          Snackbar.show({
            text: error,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#ef4c4c',
            fontFamily: 'BalooBhai2-Medium',
            action: {
              text: 'UNDO',
              textColor: '#fff'
            }
          })
          this.loadingBtn = false
          return
        }

        this.newUser = {
          name: '',
          email: '',
          password: '',
        }

        Snackbar.show({
          text: 'User Register successfuly',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#28ca1a',
          fontFamily: 'BalooBhai2-Medium',
          action: {
            text: 'UNDO',
            textColor: '#fff'
          }
        })
        this.loadingBtn = false
      }
    },
  },
}
</script>

<template>
  <view class="container">
    <view class="register-view">
      <view :style="{ padding: 30 }">
        <!-- Register Form View -->
        <view>
          <!-- Name -->
          <view
            class="form-input"
            :style="[{
              borderWidth: nameErrors.show ? 1.5 : 0,
              borderColor: nameErrors.show ? 'red' : null,
            }]"
          >
            <icon name="user-alt" :style="{ marginRight: 10, color: '#424242' }" :size="15" />
            <text-input
              :defaultValue="newUser.name"
              :onChangeText="input => {
                newUser.name = input
                _validateName(input)
              }"
              class="input"
              placeholder="Full Name"
            />
          </view>

          <view class="validation-container">
            <animatable:text
              animation="shake"
              class="validation-text"
              v-if="nameErrors.show"
            >
              {{ nameErrors.message }}
            </animatable:text>
          </view>

          <!-- Email -->
          <view
            class="form-input"
            :style="[{
              marginTop: 20,
              borderWidth: emailErrors.show ? 1.5 : 0,
              borderColor: emailErrors.show ? 'red' : null,
            }]"
          >
            <icon name="at" :style="{ marginRight: 10, color: '#424242' }" :size="15" />
            <text-input
              :defaultValue="newUser.email"
              :onChangeText="input => {
                newUser.email = input
                _validateEmail(input)
              }"
              autoCompleteType="username"
              autoCapitalize="none"
              class="input"
              placeholder="example@gmail.com"
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
              borderColor: passwordErrors.show ? 'red' : null,
            }]"
          >
            <icon name="lock" :style="{ marginRight: 10, color: '#424242' }" :size="15" />
            <text-input
              :defaultValue="newUser.password"
              :onChangeText="input => {
                newUser.password = input
                _validatePassword(input)
              }"
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

          <!-- Register Button -->
          <view :style="{ marginTop: 26 }">
            <mb-button
              :onPress="_registerUser"
              fullWidth
              :loading="loadingBtn"
              text="Sign Up"
              type="flat"
              :radius="17"
              color="#4385f5"
              :style="{ height: 42 }"
              useInputCasing
              :textStyle="{
                fontFamily: 'balooBhai2',
                fontSize: 16,
                letterSpacing: 0.6,
              }"
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
