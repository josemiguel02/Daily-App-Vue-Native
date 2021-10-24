<script>
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import F5Icon from 'react-native-vector-icons/FontAwesome5'
import store from '../store'
import ModalImagePicker from '../components/ModalImagePicker.vue'
import ListViewProfile from '../components/ListViewProfile.vue'
import {
  getPhotoOfLibrary,
  takePhotoFromCamera,
  uploadPhotoProfile,
} from '../services/updatePhotoProfile'
import { updateUserProfile } from '../services/update_user'
import DialogEditProfile from '../components/DialogEditProfile.vue'
import { logoutSession } from '../services/auth_persistent'

export default {
  props: {
    navigation: Object,
    doLogout: Function,
  },

  components: {
    Icon,
    DialogEditProfile,
    ModalImagePicker,
    ListViewProfile,
    SafeAreaView,
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
  }),

  computed: {
    tasks: () => store.state.tasks,
    user: () => store.state.users,
    totalTasK: () => store.state.totalTasK,
    doneTask: () => store.state.doneTask,
  },

  filters: {
    letterAvatar: function(value) {
      return value.substring(0, 1)
    }
  },

  methods: {
    async chooseProfileImg() {
      const { imgUri, res } = await getPhotoOfLibrary()
      let { avatar } = this.userUpdate
      let { uid } = this.user

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

    renderIcon: setting => (
      <AntDesign name={setting == 'setting' ? 'setting' : 'logout'} size={25} />
    ),

    iconChoosePhoto: images => (
      <F5Icon name={images == 'images' ? 'images' : 'camera'} size={25} />
    ),
  },

  created() {
    store.commit('getUserDataOfFireStore')
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
          <view class="profile-avatar" v-if="!user.photo">
            <text class="profile-avatar-text">
              {{ user.name | letterAvatar }}
            </text>
          </view>

          <image
            v-else
            class="profile-img"
            :source="!userUpdate.avatar
              ? { uri: user.photo } 
              : { uri: userUpdate.avatar }"
          />
        </view>

        <ripple
          :onPress="() => (modalPicker = !modalPicker)"
          :rippleContainerBorderRadius="40"
          class="profile-icon_wapper"
        >
          <icon class="profile-icon" name="circle-edit-outline" />
        </ripple>
      </view>

      <view :style="{ alignItems: 'center' }">
        <text class="profile-name" :numberOfLines="1">
          {{ user.name }}
        </text>
      </view>

      <view
        :style="{ marginTop: 10, marginHorizontal: '20%' }"
        v-if="progressBar"
      >
        <mb-progress-bar
          :visible="progressBar"
          :height="5"
          color="#a240fd"
          :animationDuration="9000"
        />
      </view>

      <view
        :style="{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'center',
        }"
      >
        <mb-button
          :onPress="() => (dialogVisible = !dialogVisible)"
          text="Edit Profile"
          type="flat"
          :radius="12"
          color="#4385f5"
          useInputCasing
          :style="{ marginRight: 20 }"
          :icon="renderIcon('setting')"
          :textStyle="{ fontFamily: 'balooBhai2' }"
        />
        <mb-button
          :onPress="_logout"
          text="Logout"
          :loading="btnLoading"
          type="outlined"
          :radius="12"
          textColor="red"
          useInputCasing
          :icon="renderIcon()"
          :borderSize="1"
          :textStyle="{ fontFamily: 'balooBhai2' }"
        />
      </view>

      <mb-card class="profile-detail">
        <view
          class="profile-detail_box"
          :style="{ borderRightWidth: 1, borderColor: '#bbb' }"
        >
          <text :style="{ fontSize: 15, fontFamily: 'balooBhai2Medium', letterSpacing: 0.6 }">
            Total Tasks:
          </text>
          <text :style="{ fontSize: 15, fontFamily: 'balooBhai2' }">
            {{ totalTasK }}
          </text>
        </view>
        <view class="profile-detail_box">
          <text :style="{ fontSize: 15, fontFamily: 'balooBhai2Medium', letterSpacing: 0.6 }">
            Task Completed:
          </text>
          <text :style="{ fontSize: 15, fontFamily: 'balooBhai2' }">
            {{ doneTask }}
          </text>
        </view>
      </mb-card>

      <list-view-profile />
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
        type="outlined"
        :radius="15"
        :style="{ marginTop: 15, borderWidth: 0.8 }"
        textColor="#a240fd"
        useInputCasing
        :icon="iconChoosePhoto('camera')"
        :textStyle="{ fontFamily: 'balooBhai2' }"
      />
    </modal-image-picker>
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
  margin-top: 40;
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

.profile-avatar {
  width: 120;
  height: 120;
  background-color: #4385f5;
  border-radius: 100;
  margin: 4;
  align-items: center;
  justify-content: center;
}

.profile-avatar-text {
  font-size: 35;
  color: #fff;
  font-family: balooBhai2Medium; 
  letter-spacing: 0.6;
  text-transform: uppercase;
}

.profile-icon_wapper {
  top: -40;
  right: -45;
  border-radius: 50;
  background-color: #84d69eef;
}

.profile-icon {
  font-size: 35;
  color: #fff;
}

.profile-detail {
  flex-direction: row;
  border-radius: 10;
  height: 60;
  margin-top: 25;
  align-self: center;
}

.profile-detail_box {
  margin: 10;
  align-items: center;
  justify-content: center;
  width: 35%;
}

.profile-name {
  font-size: 25;
  margin-top: -18;
  letter-spacing: 1;
  max-width: 80%;
  font-family: balooBhai2Medium;
}
</style>
