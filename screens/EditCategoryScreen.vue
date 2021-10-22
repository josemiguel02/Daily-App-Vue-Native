<script>
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ColorPalette from '../components/ColorPalette.vue'
import { ToastAndroid } from 'react-native'
import EmojiPicker from 'rn-emoji-keyboard'
import { editCategory } from '../services/categories_actions'
import store from '../store'

export default {
  props: {
    navigation: Object,
    route: Object,
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
      '#ef0a0a',
      '#a83232',
      '#85929E',
      '#48C9B0',
    ],

    edit: {
      name: '',
    },
    showColorPalette: false,
    showEmoji: false,
    btnDisabled: true,
  }),

  components: { SafeAreaView, Icon, ColorPalette, EmojiPicker },

  computed: {
    category() {
      const { id, name_category, color, emoji } = this.route.params
      return { id, name_category, color, emoji }
    },
  },

  methods: {
    async _editCategory() {
      const { name } = this.edit
      const { id, color, emoji } = this.category

      if (name !== '') {
        editCategory(id, {
          name_category: name,
          color,
          emoji,
        })

        this.navigation.goBack()
        store.commit('setTasks')
      } else if (color !== '' || emoji !== '') {
        editCategory(id, {
          color,
          emoji,
        })

        this.navigation.goBack()
        store.commit('setTasks')
      } else {
        ToastAndroid.show(
          'Edit a category',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }
    },
  },

  created() {
    this.edit.name = this.category.name_category
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
        <text class="header-title_text">Edit Category</text>
      </view>
    </view>

    <!-- Form Add Category -->
    <view class="add-category-container">
      <view class="add-category-container_horizontal">
        <icon name="tag" :size="30" :style="{ color: '#4385f5' }" />
        <text-input
          class="input"
          placeholder="Category name"
          :defaultValue="category.name_category"
          :onChangeText="txt => edit.name = txt"
        />
      </view>

      <view
        class="add-category-container_horizontal"
        :style="{ marginTop: 16 }"
      >
        <icon name="water" :size="30" :style="{ color: category.color }" />
        <ripple
          :onPress="() => (showColorPalette = !showColorPalette)"
          :style="{ marginLeft: 10, flex: 1, padding: 10 }"
          :rippleContainerBorderRadius="15"
        >
          <text>Select the color.</text>
        </ripple>
      </view>

      <view
        class="add-category-container_horizontal"
        :style="{ marginTop: 16 }"
      >
        <text :style="{ fontSize: 22 }">
          {{ category.emoji }}
        </text>
        <ripple
          :onPress="() => (showEmoji = !showEmoji)"
          :style="{ marginLeft: 14, flex: 1, padding: 10 }"
          :rippleContainerBorderRadius="15"
        >
          <text>Select the emoji.</text>
        </ripple>
      </view>
    </view>
    
    <view class="add-category-btn">
      <mb-button
        :onPress="_editCategory"
        text="Edit Category"
        type="flat"
        fullWidth
        :radius="20"
        :color="category.color"
        useInputCasing
        :disabled="!edit.name"
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
            category.color = item
            showColorPalette = false
          }"
        />
      </view>
    </ColorPalette>

    <EmojiPicker
      :open="showEmoji"
      :onClose="() => (showEmoji = false)"
      categoryPosition="top"
      :onEmojiSelected="e => category.emoji = e.emoji"
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
  font-size: 20;
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
