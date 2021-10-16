<script>
import * as Animatable from 'react-native-animatable'

export default {
  props: {
    showSnackbar: Boolean,
    message: String,
    color: String,
  },

  components: { Animatable },

  data: () => ({
    snackbarDuration: 0,
  }),

  /* methods: {
    snackTimeOut() {
      setTimeout(() => (this.showSnackbar = false), 4000)
    },
  },

  created() {
    this.snackTimeOut()
  }, */
}
</script>

<template>
    <mb-snackbar
      :visible="showSnackbar"
      class="snackbar"
      :style="{ backgroundColor: color }"
    >
      <text class="snackbar-msg">{{ message }}</text>
    </mb-snackbar>
</template>

<style>
.snackbar {
  margin-bottom: 20;
  border-radius: 10;
  width: 90%;
  position: absolute;
  bottom: 0;
  align-self: center;
}

.snackbar-msg {
  font-size: 14;
  font-weight: bold;
  text-align: center;
}
</style>
