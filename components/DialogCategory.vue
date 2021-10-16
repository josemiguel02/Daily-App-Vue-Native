<script>
import { deleteCategory } from '../services/categories_actions';
import store from '../store'

export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
    sendIdCategory: String,
  },

  methods: {
    handlerDelete() {
      deleteCategory(this.sendIdCategory)
      this.visible = !this.visible
      store.commit('clearCategorySelect')
    }
  },
}
</script>

<template>
  <modal 
    :isOpen="visible" 
    :onClosed="closeDialog" 
    :animationDuration="220"
    class="modal"
  >

    <view class="line" />

    <view :style="{ marginTop: 15 }">
      <slot />
      <mb-button 
        text="Delete Category"
        type="flat"
        fullWidth
        :radius="20"
        color="red"
        :style="{ marginTop: 17 }"
        useInputCasing
        :onPress="handlerDelete"
      />
    </view>
  </modal>
</template>

<style>
.modal {
  /* justify-content: center; */
  height: 140;
  width: 80%;
  border-radius: 20;
  padding: 12;
  background-color: #F7F6FF;
  /* align-items: center; */
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
