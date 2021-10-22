<script>
import store from '../store'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DialogCategory from '../components/DialogCategory.vue'

export default {
  props: {
    navigation: Object,
  },

  data: () => ({
    showDialogCategory: false,
    categoryData: null,
  }),

  components: { SafeAreaView, Icon, DialogCategory },

  computed: {
    getCategories: () => store.state.tasksCategory,
  },
}
</script>

<template>
  <SafeAreaView class="container">
    <status-bar
      background-color="transparent"
      barStyle="dark-content"
      translucent
    />

    <view class="header-horizontal">
      <ripple
        :onPress="() => navigation.openDrawer()"
        class="drawer"
        :rippleContainerBorderRadius="15"
      >
        <image
          :style="{ width: 30, height: 30, tintColor: '#000000' }"
          :source="require('../assets/menu-drawer.png')"
        />
      </ripple>

      <ripple
        :style="{
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
        }"
        :rippleContainerBorderRadius="50"
        :onPress="() => navigation.navigate('AddCategoryScreen')"
      >
        <icon name="tag-plus" :size="30" :style="{ color: '#4385f5' }" />
      </ripple>
    </view>

    <!-- Categories Empty -->
    <view class="categories-empty" v-if="!getCategories.length">
      <icon name="tag-multiple" :size="80" :style="{ color: '#4385f5' }" />
      <text class="categories-empty_text">You don't have new categories</text>
    </view>

    <scroll-view :showsVerticalScrollIndicator="false">
      <view :style="{ marginLeft: 25, marginTop: 22 }">
        <text :style="{ fontSize: 25, fontWeight: 'bold' }">Categories</text>
      </view>

      <view class="list-container">
        <ripple
          :rippleContainerBorderRadius="15"
          class="list-item"
          v-for="(item, index) in getCategories"
          :key="index"
          :style="{
            backgroundColor: `${item.color}15`,
            borderWidth: 0.5,
            borderColor: item.color,
          }"
          :onPress="() => {
            showDialogCategory = !showDialogCategory
            categoryData = item
          }"
        >
          <text :style="{ fontSize: 28 }">{{ item.emoji }}</text>
          <text
            :numberOfLines="1"
            class="list-item-text"
            :style="{ color: item.color, fontWeight: 'bold' }"
          >
            {{ item.name_category }}
          </text>
          <text :style="{ fontSize: 18, color: item.color }"
            >{{ item.countTasks }} tasks</text
          >
        </ripple>
      </view>
    </scroll-view>

    <dialog-category
      :visible="showDialogCategory"
      :closeDialog="() => showDialogCategory = false"
      :categoryData="categoryData"
    >
      <mb-button
        text="Edit Category"
        type="flat"
        fullWidth
        :radius="20"
        useInputCasing
        color="#4385f5"
        :onPress="() => {
          showDialogCategory = !showDialogCategory
          navigation.navigate('EditCategoryScreen', categoryData)
        }"
      />
    </dialog-category>
  </SafeAreaView>
</template>

<style>
.container {
  flex: 1;
  background-color: #f7f6ff;
}

.header-horizontal {
  flex-direction: row;
  justify-content: space-between;
  margin-horizontal: 12;
  margin-top: 20;
}

.drawer {
  width: 44;
  height: 44;
  align-items: center;
  justify-content: center;
}

.categories-empty {
  position: absolute;
  align-self: center;
  align-items: center;
  top: 50%;
}

.categories-empty_text {
  margin-top: 15;
  font-size: 22;
  font-style: italic;
}

.list-container {
  margin-horizontal: 25;
  margin-top: 25;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20;
}

.list-item {
  margin-bottom: 10;
  padding: 12;
  border-radius: 15;
  width: 47%;
  margin-bottom: 20;
  height: 140;
  justify-content: space-between;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2;
  border-radius: 5;
  margin-right: 5;
}

.list-item-text {
  font-size: 18;
}
</style>
