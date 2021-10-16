<script>
import { editCategory } from '../services/categories_actions'
import store from '../store'

export default {
  props: {
    visible: Boolean,
    closeDialog: Function,
    categoryData: Object,
  },

  data: () => ({
    editCategory: ''
  }),

  methods: {
    handlerEditCategory() {
      editCategory(
        this.categoryData.id, {
          name_category: this.editCategory
        }
      )

      this.editCategory = ''
      this.visible = false
      store.commit('setTasks')
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

    <view class="edit-container">
      <text-input 
        :defaultValue="categoryData.name_category"
        :onChangeText="txt => editCategory = txt"
        placeholder="Edit Category" 
        class="edit-input" 
      />

      <mb-button 
        text="Edit"
        type="flat"
        :radius="20"
        useInputCasing
        :style="{ marginTop: 20 }"
        :onPress="handlerEditCategory"
        :disabled="(categoryData.name_category && editCategory) == ''"
      />
    </view>
  </modal>
</template>

<style>
.modal {
  justify-content: center;
  height: 140;
  width: 80%;
  border-radius: 20;
  align-items: center;
  background-color: #F7F6FF;
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

.edit-container {
  width: 100%;
  padding-horizontal: 30;
}

.edit-input {
  border-bottom-width: 1.5;
  border-color: #4385f5;
}
</style>
