<script>
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ColorPalette from '../components/ColorPalette.vue'
import store from '../store'
import { getAuthUid } from '../services/auth_getUid'
import EmojiPicker from 'rn-emoji-keyboard'

export default {
  props: {
    navigation: Object,
  },

  data: () => ({
    backgroundColors: [
      '#17E179',
      '#17E1DE',
      '#4385f5',
      '#171AE1',
      '#791EE4',
      '#E41E89',
      '#F0E619',
      '#E48C1E',
      '#ef4c4c',
      '#805D36',
      '#85929E',
      '#48C9B0',
    ],

    newCategory: {
      name: '',
      color: '#17E179',
      emoji: '🚀'
    },
    showColorPalette: false,
    selectColor: '',
    showEmoji: false,
  }),

  components: { SafeAreaView, Icon, ColorPalette, EmojiPicker },

  methods: {
    async _addCategory() {
      let { name, color, emoji } = this.newCategory

      if (name !== '') {
        const { id } = await getAuthUid()
        store.commit('addCategory', {
          userID: id,
          name_category: name,
          color,
          emoji,
          countTasks: 0,
        })
        this.navigation.goBack()
      } else {
        alert('Add a category')
      }
    }
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
    
    <view class="header">
      <ripple
        :rippleContainerBorderRadius="50"
        class="header-back"
        :onPress="() => navigation.goBack()"
      >
        <icon name="chevron-left" class="header-back_icon" />
      </ripple>

      <view class="header-title">
        <text class="header-title_text"> Add Category </text>
      </view>
    </view>

    <!-- Form Add Category -->
    <view class="add-category-container">
      <view class="add-category-container_horizontal">
        <icon name="tag" :size="30" :style="{ color: '#4385f5' }" />
        <text-input 
          :defaultValue="newCategory.name"
          :onChangeText="txt => (newCategory.name = txt)"
          placeholder="Category name" 
          class="input" 
        />
      </view>

      <view class="add-category-container_horizontal"
        :style="{ marginTop: 16 }"
      >
        <icon name="water" :size="30" :style="{ color: newCategory.color  }" />
        <ripple
          :onPress="() => showColorPalette = !showColorPalette"
          :style="{ marginLeft: 10, flex: 1, padding: 10 }"
          :rippleContainerBorderRadius="15"
        >
          <text :style="{ fontFamily: 'balooBhai2'}">Select the color</text>
        </ripple>
      </view>

      <view class="add-category-container_horizontal"
        :style="{ marginTop: 16 }"
      >
        <text :style="{ fontSize: 22 }">
          {{ newCategory.emoji }}
        </text>
        <ripple
          :onPress="() => showEmoji = !showEmoji"
          :style="{ marginLeft: 14, flex: 1, padding: 10 }"
          :rippleContainerBorderRadius="15"
        >
          <text :style="{ fontFamily: 'balooBhai2'}">Select the emoji</text>
        </ripple>
      </view>
    </view>

    <view class="add-category-btn">
      <mb-button 
        :onPress="_addCategory"
        text="Create Category"
        type="flat"
        fullWidth
        :radius="20"
        :color="newCategory.color"
        useInputCasing
        :disabled="!newCategory.name"
        :textStyle="{ fontFamily: 'balooBhai2' }"
      />
    </view>

    <ColorPalette
      :visible="showColorPalette"
      :closeDialog="() => showColorPalette = false"
    >
      <view class="color-palette-container">
        <touchableOpacity
          class="color-palette"
          v-for="(item, index) in backgroundColors"
          :key="index"
          :style="{ backgroundColor: item }"
          :onPress="() => {
            newCategory.color = item
            showColorPalette = false
          }"
        />
      </view>
    </ColorPalette>

    <EmojiPicker 
      :open="showEmoji"
      :onClose="() => showEmoji = false"
      :onEmojiSelected="e => newCategory.emoji = e.emoji"
      categoryPosition="top"
      :containerStyles="{ backgroundColor: '#F7F6FF' }"
    />
  </SafeAreaView>
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

.header-back {
  width: 45;
  height: 45;
  margin-left: 10;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.header-back_icon {
  font-size: 34;
  align-self: center;
}

.header-title {
  flex: 1;
  align-items: center;
}

.header-title_text {
  font-size: 24;
  font-family: balooBhai2Medium;
}

.add-category-container {
  margin-horizontal: 20;
  margin-top: 30;
}

.add-category-container_horizontal {
  flex-direction: row;
  align-items: center;
}

.input {
  background-color: #fff;
  padding-horizontal: 15;
  height: 40;
  border-radius: 15;
  margin-left: 10;
  flex: 1;
  border-width: 0.2;
  border-color: #bbbbbb3d;
  font-family: balooBhai2;
}

.add-category-btn {
  position: absolute;
  bottom: 10;
  align-self: center;
  width: 90%;
}

.color-palette-container {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.color-palette {
  width: 30;
  height: 30;
  margin: 10;
  border-radius: 10;
}
</style>
