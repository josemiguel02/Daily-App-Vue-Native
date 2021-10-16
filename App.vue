<script>
import Vue from 'vue-native-core'
// Material Bread Ui Kit
import { VueMaterialBread } from 'material-bread'
import AppNavigation from './navigation'
import Ripple from 'react-native-material-ripple'
import Modal from 'react-native-modalbox'

Vue.use(VueMaterialBread)
Vue.component('ripple', Ripple)
Vue.component('modal', Modal)

export default {
  components: { AppNavigation },
}
</script>

<template>
  <app-navigation />
</template>
