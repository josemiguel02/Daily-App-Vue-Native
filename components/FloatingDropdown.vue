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
    class="container"
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

    <scroll-view :style="{ marginBottom: 5, marginTop: 15 }">
      <ripple
        :rippleContainerBorderRadius="15"
        v-for="(item, index) in categories"
        :key="index"
        :onPress="() => handlerSelect(item)"
        class="dropdown-container"
      >
        <view class="dropdown-item">
          <view :style="{ borderColor: item.color }" class="circle" />
          <text
            :style="{ maxWidth: '92%' }"
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
.container {
  background-color: #f7f6ff;
  border-radius: 15;
  justify-content: center;
  width: 95%;
}

.categories-empty {
  position: absolute;
  align-self: center;
  align-items: center;
}

.categories-empty_text {
  margin-top: 15;
  font-size: 17;
  font-family: balooBhai2Medium;
  letter-spacing: 0.6;
}

.dropdown-container {
  margin-bottom: 10;
  margin-horizontal: 14;
  border-radius: 15;
}

.dropdown-item {
  flex-direction: row;
  align-items: center;
  padding: 6;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2.7;
  border-radius: 5;
  margin-right: 14;
}

.dropdown-item_text {
  font-size: 15;
  font-family: balooBhai2;
}
</style>
