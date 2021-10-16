<script>
import * as Animatable from 'react-native-animatable'
export default {
  components: { Animatable },
}
</script>

<template>
  <view class="splash-container">
    <status-bar 
      background-color="transparent"  
      translucent
      barStyle="dark-content"
    />
    <Animatable:Image
      :source="require('../assets/todo-list-icon.png')"
      class="splash-img"
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
    />

    <Animatable:Text
      class="splash-title"
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
    >
      ToDo List App
    </Animatable:Text>
  </view>
</template>

<style>
.splash-container {
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #F7F6FF;
}

.splash-img {
  width: 130;
  height: 130;
  margin: 20;
}

.splash-title {
  margin-top: 20;
  font-size: 22;
  font-weight: bold;
  letter-spacing: 3;
}
</style>
