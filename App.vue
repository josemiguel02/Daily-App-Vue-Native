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
  raleway: require('./assets/fonts/Raleway-Regular.ttf'),
  ralewayItalic: require('./assets/fonts/Raleway-Italic.ttf'),
  ralewayMedium: require('./assets/fonts/Raleway-Medium.ttf'),
  ralewayMediumItalic: require('./assets/fonts/Raleway-MediumItalic.ttf'),
  ralewaySemiBold: require('./assets/fonts/Raleway-SemiBold.ttf')
})

export default {
  components: { AppNavigation }
}
</script>

<template>
  <app-navigation />
</template>
