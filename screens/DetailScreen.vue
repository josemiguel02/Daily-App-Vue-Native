<script>
import store from '../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default {
  props: {
    navigation: Object,
    route: Object,
  },

  components: { Icon, SafeAreaView },

  data: () => ({
    edit: {
      title: '',
      description: '',
    },
  }),

  computed: {
    item() {
      const { id, title, done, userID, description, id_category } =
        this.route.params
      return { id, title, done, userID, description, id_category }
    },
  },

  methods: {
    editTaskAndGoBack(id) {
      const { title, description } = this.edit
      store.commit('editTask', {
        id,
        title,
        description,
      })
      this.navigation.goBack()
    },
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
      <!-- Back Button -->
      <ripple
        :rippleContainerBorderRadius="50"
        class="header-back"
        :onPress="() => navigation.goBack()"
      >
        <icon name="chevron-left" class="header-back_icon" />
      </ripple>

      <view class="header-title">
        <text class="header-title_text">Edit Task</text>
      </view>

      <!-- Edit Task -->
      <ripple
        v-if="edit.title || edit.description"
        :rippleContainerBorderRadius="50"
        class="check"
        :onPress="() => editTaskAndGoBack(item.id)"
      >
        <icon name="check" class="check-icon" />
      </ripple>
    </view>

    <scroll-view>
      <view class="edit">
        <text-input
          :defaultValue="item.title"
          :onChangeText="txt => edit.title = txt"
          class="edit-input"
          placeholder="Title"
        />

        <text-input
          :defaultValue="item.description"
          :onChangeText="txt => edit.description = txt"
          multiline
          class="edit-input"
          placeholder="Description"
          :style="{ marginTop: 12 }"
        />
      </view>
    </scroll-view>
  </SafeAreaView>
</template>

<style>
.container {
  background-color: #f7f6ff;
  flex: 1;
}

.header {
  margin-top: 12;
  align-items: center;
  flex-direction: row;
  padding-vertical: 10;
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
  font-size: 22;
  font-family: ralewaySemiBold;
}

.check {
  width: 45;
  height: 45;
  margin-right: 10;
  justify-content: center;
  align-items: center;
  right: 10;
  position: absolute;
}

.check-icon {
  font-size: 24;
}

.edit {
  margin-horizontal: 10;
  margin-top: 20;
}

.edit-input {
  width: 90%;
  padding-horizontal: 10;
  font-size: 16;
  border-radius: 20;
  font-family: ralewayMedium;
}
</style>
