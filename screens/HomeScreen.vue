<script>
import { Dimensions } from 'react-native'
import AppBar from '../components/AppBar.vue'
import TaskItem from '../components/TaskItem.vue'
import store from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RefreshControl } from 'react-native'
import BottomSheet from '../components/BottomSheet.vue'
import Categories from '../components/Categories.vue'
import Header from '../components/Header.vue'
import { SafeAreaView } from 'react-native-safe-area-context'
import FloatingInput from '../components/FloatingInput.vue'
import FloatingDropdown from '../components/FloatingDropdown.vue'

export default {
  props: {
    navigation: Object,
    openMyDrawer: Function,
    goMyCategoriesScreen: Function,
  },

  components: {
    TaskItem,
    Icon,
    RefreshControl,
    AppBar,
    BottomSheet,
    Categories,
    SafeAreaView,
    FloatingInput,
    FloatingDropdown,
    Header,
  },

  data: () => ({
    myDrawer: null,
    sheetVisible: false,
    showFab: true,
    height: (Dimensions.get('window').height * 50) / 100,
    heightTask: (Dimensions.get('window').height * 32) / 100,
    showInput: false,
  }),

  computed: {
    getTask: () => store.state.tasks,
    isLoading: () => store.state.loading,
    emptyTask: () => store.state.emptyTask,
    doneTask: () => store.state.doneTask,
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
  },

  created() {
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
      <mb-progress-circle class="spinner" color="#4385f5" :size="60" />
    </view>

    <scroll-view :showsVerticalScrollIndicator="false" class="tasks-container">
      <header />
      <categories :navigation="navigation" />

      <view class="tasks" :style="{ marginBottom: 20 }">
        <text :style="{ fontSize: 18, marginBottom: 10, fontFamily: 'ralewaySemiBold' }">
          All your tasks for today
        </text>

        <view class="tasks-empty" v-if="emptyTask">
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
      :closeSheet="
        () => {
          showFab = !showFab
          sheetVisible = false
        }
      "
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
        :onPress="
          () => {
            showFab = !showFab
            sheetVisible = !sheetVisible
          }
        "
        backgroundColor="#4385f5"
        icon="add"
        :style="{ elevation: 2 }"
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
  padding-horizontal: 20;
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
  font-size: 22;
  font-family: ralewaySemiBold;
}

.tasks-items {
  margin-top: 8;
}

.text {
  background-color: #fff;
  padding-horizontal: 15;
  height: 40;
  border-radius: 15;
  margin-left: 10;
  border-width: 0.2;
  border-color: #bbbbbb3d;
  font-size: 18;
  /* color: #bbb; */
}
</style>
