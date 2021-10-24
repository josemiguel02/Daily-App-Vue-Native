<script>
import store from '../store'
import F5Icon from 'react-native-vector-icons/FontAwesome5'

export default {
  computed: {
    user: () => store.state.users,
  },

  components: { F5Icon },
}
</script>

<template>
  <view class="listview">
    <ripple
      class="listview-item"
      :rippleContainerBorderRadius="20"
    >
      <f5-icon name="user-circle" :size="20" color="#4385f5" />
      <text class="listview-item_text" :numberOfLines="1">
        {{ user.name }}
      </text>
    </ripple>

    <ripple
      class="listview-item"
      :rippleContainerBorderRadius="20"
    >
      <f5-icon name="at" :size="20" color="#4385f5" />
      <text class="listview-item_text" :numberOfLines="1">
        {{ user.email }}
      </text>
    </ripple>

    <ripple
      class="listview-item"
      :rippleContainerBorderRadius="20"
    >
      <f5-icon name="phone" :size="20" color="#4385f5" />
      <text class="listview-item_text" :numberOfLines="1">
        {{ user.phone ? user.phone : 'Phone Empty' }}
      </text>
    </ripple>

    <ripple
      class="listview-item"
      :rippleContainerBorderRadius="20"
      rippleColor="red"
      :style="{ borderWidth: 0.5, borderColor: '#ff00008d' }"
    >
      <f5-icon name="trash" :size="20" color="red" />
      <text class="listview-item_text">Delete Account</text>
    </ripple>
  </view>
</template>

<style>
.listview {
  margin-top: 25;
  padding-horizontal: 20;
}

.listview-item {
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 15;
  border-radius: 20;
  margin-bottom: 14;
  border-width: 0.5;
  border-color: #c7c7c7c7;
}

.listview-item_text {
  margin-left: 10;
  font-size: 16;
  max-width: 90%;
  font-family: balooBhai2;
  letter-spacing: 0.6;
}
</style>
