<script>
import Icon from 'react-native-vector-icons/FontAwesome5'
import store from '../store'

export default {
  props: {
    navigation: Object,
  },

  components: { Icon },

  computed: {
    user: () => store.state.users,
    letterAvatar() {
      let { name } = store.state.users
      return name.substring(0, 1)
    }
  },
}
</script>

<template>
  <view class="appbar-container">
    <view class="appbar-horizontal">
      <!-- Drawer Button -->
      <ripple
        :onPress="() => navigation.openDrawer()"
        class="appbar-drawer"
        :rippleContainerBorderRadius="50"
      >
        <image
          :style="{ width: 30, height: 30, tintColor: '#1d1d1d' }"
          :source="require('../assets/menu-drawer.png')"
        />
      </ripple>

      <!-- Logo -->
      <view class="logo-container">
        <text class="logo-text">Js.Do App</text>
      </view>

      <!-- User Img -->
      <view class="appbar-user">
        <view class="appbar-user-img">
          <view class="profile-avatar" v-if="!user.photo">
            <text class="profile-avatar-text">
              {{ letterAvatar }}
            </text>
          </view>

          <image
            v-else
            :style="{ width: 40, height: 40, borderRadius: 100, margin: 2 }"
            :source="{ uri: user.photo }"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.appbar-container {
  background-color: #f7f6ff;
}

.appbar-horizontal {
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12;
  margin-horizontal: 12;
  padding-vertical: 2;
  margin-vertical: 4;
}

.logo-container {
  justify-content: center;
  align-items: center;
}

.logo-text {
  color: #1d1d1d;
  font-size: 22;
  font-family: balooBhai2Medium;
  letter-spacing: 1.5;
}

.appbar-user {
  justify-content: center;
}

.appbar-user-img {
  border-width: 2;
  border-color: white;
  border-radius: 100;
}

.profile-avatar {
  width: 40;
  height: 40;
  border-radius: 50;
  margin: 2;
  background-color: #4385f5;
  align-items: center;
  justify-content: center;
}

.profile-avatar-text {
  font-size: 16;
  color: #fff;
  font-family: balooBhai2Medium;
  letter-spacing: 0.6;
  text-transform: uppercase;
}

.appbar-drawer {
  justify-content: center;
  width: 44;
  height: 44;
  align-items: center;
}
</style>
