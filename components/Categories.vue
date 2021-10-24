<script>
import store from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default {
  props: {
    navigation: Object,
  },

  data: () => ({
    backgroundColors: [
      '#17E179',
      '#17E1DE',
      '#177FE1',
      '#171AE1',
      '#7917E1',
      '#DE17E1',
      '#E1DE17',
      '#E17917',
      '#ff4000',
    ],
  }),

  components: { Icon },

  computed: {
    categories: () => store.state.tasksCategory,
  },

  created() {
    store.commit('getTasksCategories')
  },
}
</script>

<template>
  <view class="categories-container">
    <text
      :style="{ fontSize: 21, marginBottom: 10, fontFamily: 'balooBhai2Medium' }"
    >
      Categories
    </text>

    <scroll-view
      horizontal
      :showsHorizontalScrollIndicator="false"
    >
      <view class="categories">
        <view
          v-for="(item, index) in categories" :key="index"
        >
          <view
            class="category-item"
            :style="{ backgroundColor: `${item.color}15`, borderWidth: 0.5, borderColor: item.color }"
          >
            <text
            :style="{ fontSize: 26 }"
            >{{ item.emoji }}</text>

            <text
              :numberOfLines="1"
              :style="{ color: item.color, fontSize: 16, marginTop: 5, fontFamily: 'balooBhai2Medium' }"
            >{{ item.name_category }}</text>

            <text
              :numberOfLines="1"
              :style="{ marginTop: 4, color: item.color, fontFamily: 'balooBhai2' }"
            >{{ item.countTasks }} tasks</text>
          </view>
        </view>
        
        <ripple class="add-category"
          :onPress="() => navigation.navigate('AddCategoryScreen')"
          :rippleContainerBorderRadius="50"
        >
          <icon name="plus" :size="24" :style="{ color: '#4385f5' }" />
        </ripple>
      </view>
    </scroll-view>
  </view>
</template>

<style>
.categories-container {
  margin-horizontal: 20;
  margin-bottom: 16;
  margin-top: 10;
}

.categories {
  margin-top: 5;
  flex-direction: row;
  align-items: center;
}

.category-item {
  padding: 15;
  border-radius: 15;
  margin-right: 13; 
  justify-content: space-between;
  height: 106;
  width: 115;
}

.add-category {
  width: 40;
  height: 40;
  align-items: center;
  justify-content: center;
  border-radius: 50;
  border-width: 1;
  border-radius: 50;
  background-color: #4385f515;
  border-color: #4385f5;
}
</style>