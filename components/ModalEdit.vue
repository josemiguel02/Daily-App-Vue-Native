<script>
export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
  },
}
</script>

<template>
  <modal
    :isOpen="visible"
    :onClosed="closeDialog"
    class="modal"
    :animationDuration="200"
  >
    <view class="line" />
    
    <view>
      <activity-indicator size="large" color="#7FCDFF" />
      <text class="modal-text">Modal Edit...</text>
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
  background-color: #f7f6ff;
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

.modal-text {
  font-size: 17;
  margin-top: 10;
  background-color: #fff;
}
</style>
