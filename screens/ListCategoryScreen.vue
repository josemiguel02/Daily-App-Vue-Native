<script>
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import store from '../store'
import TaskItem from '../components/TaskItem.vue'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FloatingInput from '../components/FloatingInput.vue'
import { RefreshControl } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default {
  props: {
    navigation: Object,
    route: Object,
  },

  data: () => ({
    showFab: true,
    showInput: false,
    refreshing: false,
    elevation: false
  }),

  components: {
    SafeAreaView,
    TaskItem,
    Icon,
    FloatingInput,
    Animatable
  },

  computed: {
    tasksForCategory: () => store.state.tasksForCategory,
    loading: () => store.state.loadingTaskCateg,
  },

  methods: {
    onRefresh() {
      this.refreshing = true
      store.commit('getSingleTasksForCategory')
      this.refreshing = false
    },

    handlerScroll({ nativeEvent }) {
      const { contentOffset } = nativeEvent
      let { y } = contentOffset
      this.elevation = y > 0
    },

    renderRefresh() {
      return (
        <RefreshControl 
          refreshing={this.refreshing}
          onRefresh={this.onRefresh}
	        colors={[this.route.params.color, 'red', 'blue', 'yellow']}
        />
      )
    }
  }
}
</script>

<template>
  <safe-area-view class="container">
    <status-bar
      background-color="transparent"
      barStyle="dark-content"
      translucent
    />

    <view class="header"
      :style="[{ borderBottomWidth: elevation ? 0.6 : 0, borderColor: '#bebebe' }]"
    >
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

    <view v-if="loading" class="spinner-wrapper">
      <mb-progress-circle :color="route.params.color" :size="60" />
    </view>

    <!-- Tasks Empty -->
    <view class="tasks-empty" v-if="!tasksForCategory.length && !loading">
      <icon
        name="check-circle"
        :size="80"
        :style="{ color: route.params.color }"
      />
      <text class="tasks-empty_text"> You don't have new tasks </text>
    </view>

    <scroll-view 
      :showsVerticalScrollIndicator="false"
      :refreshControl="renderRefresh()"
      :onScroll="handlerScroll"
    >
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
        showInput = false
        $refs.btnRef.slideInUp(300)
      }"
      :itemColor="route.params.color"
    />

    <animatable:view v-if="showFab" ref="btnRef" class="floating-btn-container">
      <ripple 
        :rippleContainerBorderRadius="50"
        class="floating-btn"
        :style="{ backgroundColor: route.params.color }"
        :onPress="() => {
          $refs.btnRef.slideOutDown(300)
          showInput = !showInput
        }"
      >
        <icon name="plus" :size="30" :style="{ color: '#fff' }" />
      </ripple>
    </animatable:view>
  </safe-area-view>
</template>

<style>
.container {
  flex: 1;
  background-color: #f7f6ff;
}

.header {
  margin-top: 12;
  align-items: center;
  flex-direction: row;
  padding-vertical: 17;
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
  font-family: balooBhai2Medium;
}

.header-emoji {
  font-size: 20;
  margin-left: 5;
}

.spinner-wrapper {
  position: absolute;
  align-self: center;
  align-items: center;
  top: 50%;
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
  font-family: balooBhai2Medium;
}

.task-container {
  padding-horizontal: 20;
  margin-top: 18;
}

.floating-btn-container {
  position: absolute;
  bottom: 20;
  right: 20;
}

.floating-btn {
  width: 55;
  height: 55;
  border-radius: 50;
  align-items: center;
  justify-content: center;
  background-color: #28ca1a;
  elevation: 2;
}
</style>
