<script>
import store from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default {
  props: {
    visible: Boolean,
    closeSheet: Function,
  },

  components: { Icon },

  computed: {
    categories: () => store.state.tasksCategory,
  },

  methods: {
    handlerSelect(item) {
      store.commit('setSelect', item)
    },
  },
}
</script>

<template>
  <modal
    :isOpen="visible"
    :onClosed="closeSheet"
    class="modal"
    position="bottom"
    :animationDuration="200"
    :backdropOpacity="0"
    backButtonClose
  >
    <!-- Categories Empty -->
    <view class="categories-empty" v-if="!categories.length">
      <icon name="tag-multiple" :size="40" :style="{ color: '#4385f5' }" />
      <text class="categories-empty_text">You don't have new categories</text>
    </view>

    <scroll-view
      :showsVerticalScrollIndicator="true"
      :style="{ marginBottom: 5 }"
    >
      <ripple
        :rippleContainerBorderRadius="8"
        v-for="(item, index) in categories"
        :key="index"
        :onPress="() => handlerSelect(item)"
        class="dropdown-container"
      >
        <view class="dropdown-item">
          <view :style="{ borderColor: item.color }" class="circle" />
          <text
            :style="{ maxWidth: '90%' }"
            :numberOfLines="1"
            class="dropdown-item_text"
          >
            {{ item.name_category }}
          </text>
        </view>
      </ripple>
    </scroll-view>
  </modal>
</template>

<style>
.modal {
  background-color: #f7f6ff;
  border-radius: 15;
  justify-content: center;
  padding: 12;
  width: 95%;
  margin-bottom: 0;
}

.categories-empty {
  position: absolute;
  align-self: center;
  align-items: center;
}

.categories-empty_text {
  margin-top: 15;
  font-size: 17;
  font-style: italic;
}

.dropdown-container {
  margin-bottom: 10;
}

.dropdown-item {
  flex-direction: row;
  align-items: center;
  margin: 8;
  border-radius: 15;
  padding: 8;
  padding-horizontal: 15;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2.7;
  border-radius: 5;
  margin-right: 15;
}

.dropdown-item_text {
  font-size: 15;
  font-weight: 500;
}
</style>
