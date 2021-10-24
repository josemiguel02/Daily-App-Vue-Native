<script>
import Vue from 'vue-native-core'
import { VueMaterialBread } from 'material-bread'
import AppNavigation from './navigation'
import Ripple from 'react-native-material-ripple'
import Modal from 'react-native-modalbox'
import * as Font from 'expo-font'

Vue.use(VueMaterialBread)
Vue.component('ripple', Ripple)
Vue.component('modal', Modal)

Font.loadAsync({
  balooBhai2: require('./assets/fonts/BalooBhai2-Regular.ttf'),
  balooBhai2Medium: require('./assets/fonts/BalooBhai2-Medium.ttf'),
  balooBhai2SemiBold: require('./assets/fonts/BalooBhai2-SemiBold.ttf')
})

export default {
  components: { AppNavigation }
}
</script>

<template>
  <app-navigation />
</template>
