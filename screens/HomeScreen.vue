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
  },

  data: () => ({
    myDrawer: null,
    sheetVisible: false,
    showFab: true,
    refreshing: false,
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
    }
  },

  async created() {
    store.commit('setTasks')
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

    <app-bar :navigation="navigation" />

    <view v-if="isLoading" class="spinner-wrapper">
      <mb-progress-circle color="#4385f5" :size="60" />
    </view>

    <scroll-view 
      :showsVerticalScrollIndicator="false"
      :refreshControl="renderRefresh()"
    >

      <header />
      <categories :navigation="navigation" />
      
      <view class="tasks" :style="{ marginBottom: 20 }">
        <text :style="{ fontSize: 18, marginBottom: 10, fontFamily: 'balooBhai2Medium' }">
          All your tasks for today
        </text>

        <view class="tasks-empty" v-if="!getTask.length && !isLoading">
          <icon name="check-circle" :size="80" :style="{ color: '#17E179' }" />
          <text class="tasks-empty_text"> You don't have new tasks </text>
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
        showFab = !showFab
        sheetVisible = false
      }"
    />

    <floating-dropdown
      :visible="toggleDropdown"
      :closeSheet="closeDropdown"
      :style="{ height: '26%' }"
    />

    <view :style="{ position: 'absolute', bottom: 20, right: 20 }">
      <mb-fab
        animated
        :visible="showFab"
        backgroundColor="#4385f5"
        icon="add"
        :style="{ elevation: 2 }"
        :onPress="() => {
          showFab = !showFab
          sheetVisible = !sheetVisible
        }"
      />
    </view>
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
</style>
