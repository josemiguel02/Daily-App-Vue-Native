<script>

export default {
  props: {
    visible: Boolean,
  },

}
</script>

<template>
  <modal :isOpen="visible" class="modal">
    <view>
      <activity-indicator size="large" color="#7FCDFF" />
      <text class="modal-text">Loading...</text>
    </view>
  </modal>
</template>

<style>
.modal {
  justify-content: center;
  height: 140;
  width: 140;
  border-radius: 20;
  align-items: center;
}

.modal-text {
  font-size: 17;
  margin-top: 10;
  background-color: #fff;
}
</style>
