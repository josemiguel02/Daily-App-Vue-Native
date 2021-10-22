<script>
// SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context'
import store from '../store'
import TaskItem from '../components/TaskItem.vue'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FloatingInput from '../components/FloatingInput.vue'

export default {
  props: {
    navigation: Object,
    route: Object,
  },

  data: () => ({
    showFab: true,
    showInput: false,
  }),

  components: {
    SafeAreaView,
    TaskItem,
    Icon,
    FloatingInput,
  },

  computed: {
    tasksForCategory: () => store.state.tasksForCategory,
    toggleDropdown: () => store.state.toggleDropdown,
  },

  methods: {
    closeDropdown() {
      store.commit('switchToggleDropdown', false)
    },
  },
}
</script>

<template>
  <safe-area-view class="container">
    <status-bar
      background-color="transparent"
      barStyle="dark-content"
      translucent
    />

    <view class="header">
      <ripple
        :onPress="() => navigation.openDrawer()"
        class="drawer"
        :rippleContainerBorderRadius="50"
      >
        <image
          :style="{ width: 30, height: 30, tintColor: '#1d1d1d' }"
          :source="require('../assets/menu-drawer.png')"
        />
      </ripple>

      <view class="header-title">
        <text class="header-title_text" :numberOfLines="1">
          {{ route.params.name_category }}
        </text>

        <text class="header-emoji">
          {{ route.params.emoji }}
        </text>
      </view>
    </view>

    <!-- Tasks Empty -->
    <view class="tasks-empty" v-if="!tasksForCategory.length">
      <icon
        name="check-circle"
        :size="80"
        :style="{ color: route.params.color }"
      />
      <text class="tasks-empty_text"> You don't have new tasks </text>
    </view>

    <scroll-view :showsVerticalScrollIndicator="false">
      <view class="task-container">
        <task-item
          v-for="(item, index) in tasksForCategory"
          :key="index"
          :item="item"
          :navigation="navigation"
        />
      </view>
    </scroll-view>

    <floating-input
      :visible="showInput"
      :closeSheet="() => {
        showFab = !showFab
        showInput = false
      }"
    />

    <view :style="{ position: 'absolute', bottom: 20, right: 20 }">
      <mb-fab
        animated
        :visible="showFab"
        :onPress="() => {
          showFab = !showFab
          showInput = !showInput
        }"
        :backgroundColor="route.params.color"
        icon="add"
        :style="{ elevation: 2 }"
      />
    </view>
  </safe-area-view>
</template>

<style>
.container {
  flex: 1;
  background-color: #f7f6ff;
}

.header {
  margin-top: 25;
  align-items: center;
  flex-direction: row;
}

.drawer {
  width: 45;
  height: 45;
  margin-left: 10;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.header-title {
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.header-title_text {
  font-size: 20;
  max-width: 60%;
}

.header-emoji {
  font-size: 20;
  margin-left: 5;
}

.tasks-empty {
  position: absolute;
  align-self: center;
  align-items: center;
  top: 50%;
}

.tasks-empty_text {
  margin-top: 15;
  font-size: 22;
  font-style: italic;
}

.task-container {
  padding-horizontal: 20;
  margin-top: 40;
}
</style>