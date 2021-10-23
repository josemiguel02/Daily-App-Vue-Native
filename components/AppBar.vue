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
        <text :style="{ fontSize: 19, color: '#1d1d1d', letterSpacing: 1, fontFamily: 'ralewaySemiBold' }">Js.Do App</text>
      </view>

      <!-- User Img -->
      <view class="appbar-user">
        <view class="appbar-user-img">
          <image
            :style="{ width: 40, height: 40, borderRadius: 100, margin: 2 }"
            :source="user.photo
              ? { uri: user.photo }
              : require('../assets/user_profile.png')"
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

.appbar-user {
  justify-content: center;
}

.appbar-user-img {
  border-width: 2;
  border-color: white;
  border-radius: 100;
}

.appbar-drawer {
  justify-content: center;
  width: 44;
  height: 44;
  align-items: center;
}
</style>
