<script>
import Icon from 'react-native-vector-icons/FontAwesome5'
import store from '../store'
import TextAvatar from 'react-native-text-avatar'

export default {
  props: {
    navigation: Object,
    elevation: Boolean
  },
  
  components: { Icon, TextAvatar },

  computed: {
    user: () => store.state.users,
  }
}
</script>

<template>
  <view class="appbar-container"
    :style="[{ borderBottomWidth: elevation ? 0.6 : 0, borderColor: '#bebebe' }]"
  >
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
        <image
          :source="require('../assets/tasks-logo.png')"
          :style="{ height: 30, width: 30, resizeMode:  'cover' }"
        />
        <text class="logo-text">JS.Do App</text>
      </view>

      <!-- User Img -->
      <view class="appbar-user">
        <view class="appbar-user-img">
          <text-avatar
            v-if="!user.photo"
            :size="40"
            backgroundColor="#4385f5"
            type="circle"
          >
            {{ user.name }}
          </text-avatar>

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
  padding-vertical: 5;
}

.appbar-horizontal {
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12;
  margin-horizontal: 12;
  padding-vertical: 2;
  margin-vertical: 4;
  align-items: center;
}

.logo-container {
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.logo-text {
  font-family: balooBhai2Medium;
  font-size: 23;
  margin-left: 8;
  letter-spacing: 0.6;
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

.appbar-drawer {
  justify-content: center;
  width: 44;
  height: 44;
  align-items: center;
}
</style>
