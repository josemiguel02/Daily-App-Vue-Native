<script>
import React from 'react'
import AppBar from '../components/AppBar.vue'
import TaskItem from '../components/TaskItem.vue'
import store from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl } from 'react-native'
import BottomSheet from '../components/BottomSheet.vue'
import Categories from '../components/Categories.vue'
import Header from '../components/Header.vue'
import { SafeAreaView } from 'react-native-safe-area-context'
import FloatingDropdown from '../components/FloatingDropdown.vue'
import * as Animatable from 'react-native-animatable'

export default {
  props: {
    navigation: Object,
  },

  components: {
    TaskItem,
    Icon,
    AppBar,
    BottomSheet,
    Categories,
    SafeAreaView,
    FloatingDropdown,
    Header,
    Animatable
  },

  data: () => ({
    myDrawer: null,
    sheetVisible: false,
    showFab: true,
    refreshing: false,
    elevation: false
  }),

  computed: {
    getTask: () => store.state.tasks,
    isLoading: () => store.state.loading,
    toggleDropdown: () => store.state.toggleDropdown,
  },

  methods: {
    detailPage() {
      this.navigation.navigate('DetailScreen')
    },

    showFabAndSheet() {
      this.showFab = !this.showFab
      this.sheetVisible = false
    },

    closeDropdown() {
      store.commit('switchToggleDropdown', false)
    },

    onRefresh() {
      this.refreshing = true
      store.commit('setTasks')
      this.refreshing = false
    },

    renderRefresh() {
      return (
        <RefreshControl 
          refreshing={this.refreshing}
          onRefresh={this.onRefresh}
          colors={['#17E179', 'red', 'blue', 'yellow']}
        />
      )
    },

    handlerScroll({ nativeEvent }) {
      const { contentOffset } = nativeEvent
      const { y } = contentOffset
      this.elevation = y > 0
    }
  },

  created() {
    store.commit('setTasks')
    this.navigation.addListener('focus', () => {
      store.commit('changeIndex', this.navigation.getState().index)
    })
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

    <app-bar :navigation="navigation" :elevation="elevation" />

    <view v-if="isLoading" class="spinner-wrapper">
      <mb-progress-circle color="#4385f5" :size="60" />
    </view>

    <scroll-view 
      :showsVerticalScrollIndicator="false"
      :refreshControl="renderRefresh()"
      :onScroll="handlerScroll"
    >

      <header />
      <categories :navigation="navigation" />
      
      <view class="tasks" :style="{ marginBottom: 20 }">
        <text :style="{ fontSize: 18, marginBottom: 10, fontFamily: 'balooBhai2Medium' }">
          All your tasks for today
        </text>

        <view class="tasks-empty" v-if="!getTask.length && !isLoading">
          <icon name="check-circle" :size="80" :style="{ color: '#17E179' }" />
          <text class="tasks-empty_text">You don't have new tasks</text>
        </view>

        <view v-if="getTask.length">
          <task-item
            v-for="(item, index) in getTask"
            :key="index"
            :item="item"
            :navigation="navigation"
          />
        </view>
      </view>
    </scroll-view>

    <bottom-sheet
      :visible="sheetVisible"
      :closeSheet="() => {
        sheetVisible = false
        $refs.btnRef.slideInUp(300)
      }"
    />

    <floating-dropdown
      :visible="toggleDropdown"
      :closeSheet="closeDropdown"
      :style="{ height: '26%' }"
    />

    <animatable:view v-if="showFab" ref="btnRef" class="floating-btn-container">
      <ripple
        :rippleContainerBorderRadius="50"
        class="floating-btn"
        :onPress="() => {
          $refs.btnRef.slideOutDown(300)
          sheetVisible = !sheetVisible
        }"
      >
        <icon name="plus" :size="30" :style="{ color: '#fff' }" />
      </ripple>
    </animatable:view>
  </SafeAreaView>
</template>

<style>
.container {
  flex: 1;
  background-color: #f7f6ff;
}

.tasks {
  padding-horizontal: 20
}

.spinner-wrapper {
  position: absolute;
  align-self: center;
  top: 70%;
}

.tasks-empty {
  margin-top: 30%;
  align-items: center;
}

.tasks-empty_text {
  margin-top: 10;
  font-size: 23;
  font-family: balooBhai2Medium;
  letter-spacing: 0.6;
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
  background-color: #4385f5;
  align-items: center;
  justify-content: center;
  elevation: 2;
}
</style>
