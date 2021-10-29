<script>
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Dimensions } from 'react-native'

export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
  },
  components: { Icon },

  data: () => ({
    width: (Dimensions.get('window').width * 80) / 100,
    height: (Dimensions.get('window').height * 20) / 100,
  }),
}
</script>

<template>
  <modal
    :style="{ width, height: 'auto' }"
    :isOpen="visible"
    class="dialog"
    :animationDuration="200"
    :onClosed="closeDialog"
  >
    <view class="line" />
    <slot />
  </modal>
</template>

<style>
.dialog {
  border-radius: 20;
  background-color: #f7f6ff;
  padding: 24;
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
</style>
