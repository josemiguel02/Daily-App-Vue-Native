<script>
import React from 'react'
import { BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import F5Icon from 'react-native-vector-icons/FontAwesome5'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import store from '../store'
import ModalImagePicker from '../components/ModalImagePicker.vue'
import {
  getPhotoOfLibrary,
  takePhotoFromCamera,
  uploadPhotoProfile,
} from '../services/updatePhotoProfile'
import { updateUserProfile } from '../services/update_user'
import DialogEditProfile from '../components/DialogEditProfile.vue'
import { logoutSession } from '../services/auth_persistent'
import TextAvatar from 'react-native-text-avatar'
import DeleteAccount from '../components/DeleteAccount.vue'

export default {
  props: {
    navigation: Object,
    doLogout: Function,
  },

  components: {
    MaterialCIcon,
    DialogEditProfile,
    ModalImagePicker,
    SafeAreaView,
    TextAvatar,
    F5Icon,
    MIcon,
    DeleteAccount
  },

  data: () => ({
    userUpdate: {
      name: '',
      email: '',
      avatar: null,
      phone: '',
    },

    btnLoading: false,
    dialogVisible: false,
    modalPicker: false,
    progressBar: false,
    modalDeleteAccount: false,
  }),

  computed: {
    tasks: () => store.state.tasks,
    user: () => store.state.users,
    totalTasK: () => store.state.totalTasK,
    doneTask: () => store.state.doneTask,
  },

  methods: {
    async chooseProfileImg() {
      const { imgUri, res } = await getPhotoOfLibrary()
      let { avatar } = this.userUpdate
      const { uid } = this.user

      try {
        if (res) {
          avatar = imgUri
          this.modalPicker = false
          this.progressBar = true
          const { getUrlImg } = await uploadPhotoProfile(avatar, uid)
          updateUserProfile(uid, {
            photo: getUrlImg,
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.progressBar = false
      }
    },

    async takePhoto() {
      const { response, imgUri } = await takePhotoFromCamera()
      let { avatar } = this.userUpdate
      let { uid } = this.user

      try {
        if (response) {
          avatar = imgUri
          this.modalPicker = false
          this.progressBar = true
          const { getUrlImg } = await uploadPhotoProfile(avatar, uid)
          updateUserProfile(uid, {
            photo: getUrlImg,
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.progressBar = false
      }
    },

    async _logout() {
      this.btnLoading = true
      await logoutSession()
      this.doLogout()
    },

    deletePhoto() {
      store.commit('editDataUser', {
        id: { uid: this.user.uid },
        data: { photo: null },
      })

      this.modalPicker = false
    },

    iconChoosePhoto: images => (
      <F5Icon name={images == 'images' ? 'images' : 'camera'} size={25} />
    ),
  },

  created() {
    store.commit('getUserDataOfFireStore')
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigation.navigate('HomeScreen')
      store.commit('changeIndex', 0)
      return true
    })
  },
}
</script>

<template>
  <SafeAreaView class="container">
    <status-bar
      background-color="transparent"
      barStyle="light-content"
      translucent
    />

    <view class="header">
      <view class="header-circle_rigth" />
      <view class="header-circle_left" />
    </view>

    <ripple
      :onPress="() => navigation.openDrawer()"
      class="drawer"
      :rippleContainerBorderRadius="50"
    >
      <image
        :style="{ width: 30, height: 30, tintColor: '#fff' }"
        :source="require('../assets/menu-drawer.png')"
      />
    </ripple>

    <scroll-view :showsVerticalScrollIndicator="false">
      <view class="profile">
        <view class="img-container">
          <text-avatar
            v-if="!user.photo"
            :size="120"
            backgroundColor="#4385f5"
            :style="{ margin: 4 }"
            type="circle"
          >
            {{ user.name }}
          </text-avatar>

          <image
            v-else
            class="profile-img"
            :source="
              !userUpdate.avatar
                ? { uri: user.photo }
                : { uri: userUpdate.avatar }
            "
          />
        </view>

        <ripple
          :onPress="() => (modalPicker = !modalPicker)"
          :rippleContainerBorderRadius="40"
          class="profile-icon_wapper"
        >
          <material-c-icon class="profile-icon" name="circle-edit-outline" />
        </ripple>
      </view>

      <view :style="{ alignItems: 'center' }">
        <text class="profile-name" :numberOfLines="1">
          {{ user.name }}
        </text>
        <text class="profile-email" :numberOfLines="1">
          {{ user.email }}
        </text>
        <text v-if="user.phone" class="profile-phone" :numberOfLines="1">
          {{ user.phone }}
        </text>
      </view>

      <view
        :style="{ marginTop: 10, marginHorizontal: '20%' }"
        v-if="progressBar"
      >
        <mb-progress-bar
          visible
          :height="6"
          color="#84d69eef"
          :animationDuration="9000"
          :indicatorStartPosition="10"
        />
      </view>

      <mb-card class="profile-detail">
        <view
          class="profile-detail_box"
          :style="{ borderRightWidth: 1, borderColor: '#bbb' }"
        >
          <text
            :style="{
              fontSize: 15,
              fontFamily: 'balooBhai2Medium',
              letterSpacing: 0.6,
            }"
          >
            Total Tasks
          </text>
          <text :style="{ fontSize: 15, fontFamily: 'balooBhai2' }">
            {{ totalTasK }}
          </text>
        </view>
        <view class="profile-detail_box">
          <text
            :style="{
              fontSize: 15,
              fontFamily: 'balooBhai2Medium',
              letterSpacing: 0.6,
            }"
          >
            Task Completed
          </text>
          <text :style="{ fontSize: 15, fontFamily: 'balooBhai2' }">
            {{ doneTask }}
          </text>
        </view>
      </mb-card>

      <view class="listview">
        <ripple
          class="listview-item"
          :rippleContainerBorderRadius="20"
          :onPress="() => (dialogVisible = !dialogVisible)"
        >
          <view class="icon-container">
            <f5-icon name="user-edit" :size="20" color="#4385f5" />
          </view>
          <text class="listview-item_text" :numberOfLines="1">
            Edit Profile
          </text>
        </ripple>

        <ripple
          class="listview-item"
          :rippleContainerBorderRadius="20"
          :onPress="_logout"
        >
          <view class="icon-container">
            <mb-progress-circle :size="20" color="#4385f5" v-if="btnLoading" />
            <m-icon name="logout" :size="23" color="#4385f5" v-else />
          </view>
          <text class="listview-item_text" :numberOfLines="1"> Logout </text>
        </ripple>

        <ripple class="listview-item" :rippleContainerBorderRadius="20">
          <view class="icon-container">
            <f5-icon name="info-circle" :size="20" color="#4385f5" />
          </view>
          <text class="listview-item_text" :numberOfLines="1">
            Information to App
          </text>
        </ripple>

        <ripple
          class="listview-item"
          :rippleContainerBorderRadius="20"
          rippleColor="#ef4c4c"
          :style="{ borderWidth: 0.5, borderColor: '#ef4c4c' }"
          :onPress="() => (modalDeleteAccount = !modalDeleteAccount)"
        >
          <view class="icon-container">
            <f5-icon name="trash" :size="20" color="#ef4c4c" />
          </view>
          <text class="listview-item_text">Delete Account</text>
        </ripple>
      </view>
    </scroll-view>

    <dialog-edit-profile
      :closeDialog="() => (dialogVisible = false)"
      :visible="dialogVisible"
    />

    <modal-image-picker
      :visible="modalPicker"
      :closeDialog="() => (modalPicker = false)"
    >
      <mb-button
        :onPress="chooseProfileImg"
        text="Choose your new photo"
        type="flat"
        :radius="15"
        color="#35bff1"
        useInputCasing
        :style="{ marginTop: 5 }"
        :icon="iconChoosePhoto('images')"
        :textStyle="{ fontFamily: 'balooBhai2' }"
      />
      <mb-button
        :onPress="takePhoto"
        text="Take a new photo"
        type="flat"
        :radius="15"
        :style="{ marginTop: 15 }"
        color="#a240fd"
        useInputCasing
        :icon="iconChoosePhoto('camera')"
        :textStyle="{ fontFamily: 'balooBhai2' }"
      />
      <mb-button
        :onPress="deletePhoto"
        text="Delete photo"
        type="outlined"
        :radius="15"
        :style="{ marginTop: 15 }"
        :borderSize="1"
        textColor="#ef4c4c"
        useInputCasing
        :textStyle="{ fontFamily: 'balooBhai2' }"
      >
        <view render-prop="icon">
          <f5-icon name="trash" :size="20" :style="{ color: '#ef4c4c' }" />
        </view>
      </mb-button>
    </modal-image-picker>

    <delete-account
      :visible="modalDeleteAccount"
      :closeDialog="() => (modalDeleteAccount = false)"
      :doLogout="doLogout"
    />
  </SafeAreaView>
</template>

<style>
.container {
  flex: 1;
  background-color: #f7f6ff;
}

.header {
  position: absolute;
  width: 100%;
  top: -50;
  z-index: -100;
}

.header-circle_rigth {
  width: 400;
  height: 400;
  background-color: #a240fd;
  border-radius: 200;
  right: -100;
  top: -180;
}

.header-circle_left {
  width: 200;
  height: 200;
  background-color: #35bff1;
  border-radius: 200;
  left: -25;
  top: -390;
}

.drawer {
  justify-content: center;
  width: 44;
  height: 44;
  align-items: center;
  margin-left: 12;
  margin-top: 20;
}

.profile {
  margin-top: 20;
  align-items: center;
  height: 160;
}

.img-container {
  border-width: 3;
  border-radius: 100;
  border-color: #4385f5;
}

.profile-img {
  width: 120;
  height: 120;
  border-radius: 100;
  margin: 4;
}

.profile-icon_wapper {
  top: -40;
  right: -45;
  border-radius: 50;
  background-color: #3bd46b;
}

.profile-icon {
  font-size: 35;
  color: #fff;
}

.profile-name {
  font-size: 22;
  margin-top: -15;
  letter-spacing: 1;
  max-width: 80%;
  font-family: balooBhai2Medium;
}

.profile-email {
  margin-top: -5;
  font-size: 20;
  letter-spacing: 1;
  max-width: 80%;
  font-family: balooBhai2;
}

.profile-phone {
  font-size: 16;
  letter-spacing: 1;
  max-width: 80%;
  font-family: balooBhai2;
}

.profile-detail {
  flex-direction: row;
  border-radius: 10;
  height: 60;
  margin-top: 17;
  align-self: center;
}

.profile-detail_box {
  margin: 10;
  align-items: center;
  justify-content: center;
  width: 35%;
}

.listview {
  margin-top: 25;
  padding-horizontal: 20;
}

.listview-item {
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 15;
  border-radius: 20;
  margin-bottom: 14;
  border-width: 0.5;
  border-color: #c7c7c7c7;
}

.icon-container {
  width: 25;
  height: 25;
  align-items: center;
  justify-content: center;
}

.listview-item_text {
  margin-left: 5;
  font-size: 16;
  max-width: 90%;
  font-family: balooBhai2;
  letter-spacing: 0.6;
}
</style>
