<script>
import React from 'react'
import { Dimensions, ToastAndroid, View, Animated } from 'react-native'
import store from '../store'
import { Swipeable } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default {
  props: {
    item: Object,
    navigation: Object,
  },
  
  components: { 
    Swipeable,
    Icon
  },

  data: () => ({
    width: (Dimensions.get('window').width * 64) / 100
  }),

  methods: {
    deleteTask(item) {
      const { id, categoryID } = item

      store.commit('deleteTask', { id, categoryID })
      ToastAndroid.show(
        'Task deleted :(',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      
      this.closeSwipe()
    },

    detailPage(item) {
      this.navigation.navigate('DetailScreen', item)
    },

    closeSwipe() {
      this.$refs.refSwipe.close()
    },

    editAction(progress, dragX) {
      const scale = dragX.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 1]
      })

      return (
        <View
          style={{
            backgroundColor: '#17E179',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 49,
            marginRight: -10,
            marginTop: 2,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15
          }}
        >
          <Animated.View style={{transform: [{ scale }]}}>
            <Icon name="check" size={23} style={{ color: '#fff' }} />
          </Animated.View>
        </View>
      )
    },

    deleteAction(progress, dragX) {
      const scale = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [1, 0]
      })

      return (
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 49,
            marginLeft: -10,
            marginTop: 2,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15
          }}
        >
          <Animated.View style={{transform: [{ scale }]}}>
            <Icon name="trash-can" size={23} style={{ color: '#fff' }} />
          </Animated.View>
        </View>
      )
    },

    makeDone(item) {
      const { id, done } = item
      store.commit('makeDone', {
        id,
        itsDone: !done
      })

      this.closeSwipe()
    },
  }
}
</script>

<template>
  <view>
    <swipeable
      ref="refSwipe"
      :friction="1.2"
      :overshootLeft="false"
      :overshootRight="false"
      :renderLeftActions="(progress, dragX) => editAction(progress, dragX)"
      :renderRightActions="(progress, dragX) => deleteAction(progress, dragX)"
      :onSwipeableRightOpen="() => deleteTask(item)"
      :onSwipeableLeftOpen="() => makeDone(item)"
    >
      <pressable class="item" :onPress="() => detailPage(item)">
        <view class="item-left">
          <touchableOpacity
            class="square-check"
            :onPress="() => makeDone(item)"
            :style="[{
              backgroundColor: item.done ? item.color : '#d9d9da'
            }]"
          >
            <icon v-if="item.done" name="check" :size="18" color="#fff" />
          </touchableOpacity>

          <text
            :style="{ maxWidth: width }"
            :class="[item.done ? 'task-done' : 'item-text']"
            :numberOfLines="1"
          >
            {{ item.title }}
          </text>
        </view>
        <view :style="{ borderColor: item.color }" class="circle" />
      </pressable>
    </swipeable>
  </view>
</template>

<style>
.item {
  background-color: #fff;
  padding: 13;
  border-radius: 15;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20;
  height: 52;
  border-width: 0.2;
  border-color: #bbbbbb3d;
}

.item-left {
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.square-check {
  width: 22;
  height: 22;
  border-radius: 8;
  margin-right: 10;
  align-items: center;
  justify-content: center;
  padding: 2;
}

.item-text {
  font-size: 15;
  color: black;
  font-family: balooBhai2;
  letter-spacing: 0.6;
}

.task-done {
  font-size: 15;
  text-decoration-line: line-through;
  color: #bbb;
  font-family: balooBhai2;
  letter-spacing: 0.6;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2.7;
  border-radius: 5;
  margin-right: 5;
}
</style>
