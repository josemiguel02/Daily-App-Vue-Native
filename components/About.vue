<script>
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Linking, Dimensions } from 'react-native'

export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
  },

  data: () => ({
    width: (Dimensions.get('window').width * 80) / 100,
    iconsInfo: [
      {
        name: 'github',
        url: 'https://github.com/josemiguel02',
        color: '#161b22'
      },
      {
        name: 'instagram',
        url: 'https://www.instagram.com/jmdp.02',
        color: '#d44958'
      },
      {
        name: 'email', 
        url: 'mailto:jeffrey_m@hotmail.es', 
        color: '#4385f5' 
      }
    ]
  }),

  components: { MIcon },

  methods: {
    handlerLink: uri => Linking.openURL(uri),
  },
}
</script>

<template>
  <modal
    :isOpen="visible"
    :onClosed="closeDialog"
    class="container"
    :animationDuration="200"
    :style="{ width, height: 'auto' }"
  >
    <view class="line" />

    <view class="about-container">
      <image class="about-logo" :source="require('../assets/tasks-logo.png')" />
      <text class="about-title">JS.Do App</text>
      <text class="about-subtitle">This application was developed by</text>
      <text class="about-link">José Miguel Domínguez Pérez</text>

      <view class="about-icons">
        <touchable-opacity
          v-for="(item, index) in iconsInfo"
          :key="index"
          :onPress="() => handlerLink(item.url)"
          class="icon-item"
        >
          <m-icon :name="item.name" :size="28" :style="{ color: item.color }" />
        </touchable-opacity>
      </view>
    </view>
  </modal>
</template>

<style>
.container {
  justify-content: center;
  border-radius: 20;
  align-items: center;
  background-color: #f7f6ff;
  padding-vertical: 30;
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

.about-container {
  margin-top: 15;
  align-items: center;
  justify-content: center;
}

.about-logo {
  width: 60;
  height: 60;
}

.about-title {
  margin-top: 10;
  font-size: 25;
  font-family: balooBhai2;
  color: #1d1d1d;
}

.about-subtitle {
  font-size: 18;
  font-family: balooBhai2;
  color: #424242;
}

.about-link {
  font-size: 18;
  font-family: balooBhai2Medium;
  color: #1d1d1d;
}

.about-icons {
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10;
}

.icon-item {
  margin-right: 10;
  padding: 2;
}
</style>
