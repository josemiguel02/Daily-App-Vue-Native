<script>
import Icon from 'react-native-vector-icons/FontAwesome5'
import store from '../store'
// SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context'

export default {
  props: {
    navigation: Object,
  },

  data: () => ({
    selectIndex: 0,
    routes: [
      { label: 'Home', icon: 'home', route: 'HomeScreen' },
      { label: 'Profile', icon: 'user-alt', route: 'ProfileScreen' },
      { label: 'Categories', icon: 'tags', route: 'CategoriesScreen' },
    ]
  }),

  components: { SafeAreaView, Icon },

  computed: {
    user: () => store.state.users,
    categories: () => store.state.tasksCategory,
  },

  methods: {
    clearSelectCategory() {
      store.commit('clearCategorySelect')
    },

    handlerListCategory(item, index) {
      const { id } = item
      store.commit('setCategoryID', id)
      this.navigation.navigate('ListCategoryScreen', item)
      store.commit('getSingleTasksForCategory')
      this.selectIndex = index + 3
    }
  },

  created() {
    store.commit('getUserDataOfFireStore')
  },
}
</script>

<template>
  <SafeAreaView class="container">
    <scroll-view :style="{ marginBottom: 20 }"
      :showsVerticalScrollIndicator="false"
    >
      <view class="user-wrapper">
        <view class="user-img-container">
          <ripple
            class="user-img-ripple"
            :rippleContainerBorderRadius="50"
            :onPress="() => {
              selectIndex = 1
              navigation.navigate('ProfileScreen')
            }">
            <image class="user-img"
              :source="user.photo
                ? { uri: user.photo }
                : require('../assets/user_profile.png')"
            />
          </ripple>
        </view>
        <text class="user-name" :numberOfLines="1"> {{ user.name }} </text>
        <text class="user-email"> {{ user.email }} </text>
      </view>
      
      <mb-divider
        :style="{ borderWidth: 0.5, borderColor: '#bbb', marginTop: 15 }"
      />
      
      <view class="drawer-section-container">
        <ripple 
          v-for="(item, index) in routes" :key="index"
          :rippleContainerBorderRadius="10"
          class="drawer-section-item"
          :onPress="() => {
            navigation.navigate(item.route)
            selectIndex = index
          }"  
          :style="[{ 
            backgroundColor: selectIndex == index ? '#d2e7fa' : '#f7f6ff',
          }]"
        >
          <view
            :style="{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }"
          >
            <icon :name="item.icon" :size="18" :style="{ color: '#4385f5' }"/>
          </view>
          <text
            :style="[{ 
              marginLeft: 10, 
              fontSize: 14,
              color: selectIndex == index ? '#1e88e5' : 'black', 
              fontFamily: 'balooBhai2', 
              letterSpacing: 0.6
            }]"
          >
            {{ item.label }}
          </text>
        </ripple>
      </view>
      
      <mb-divider
        v-if="categories.length"
        :style="{ borderWidth: 0.5, borderColor: '#bbb' }"
      />

      <ripple 
        :rippleContainerBorderRadius="10"
        v-for="(item, index) in categories" :key="index"
        class="category-container"
        :style="[{ 
          backgroundColor: selectIndex == index + 3 ? `${item.color}25` : '#f7f6ff',
        }]"
        :onPress="() => handlerListCategory(item, index)"
      >
        <view class="category-item">
          <view
            :style="{ flexDirection: 'row', alignItems: 'center' }"
          >
            <view :style="{ borderColor: item.color }" class="circle" />
            <text
              :numberOfLines="1"
              :style="[{
                color: selectIndex == index + 3 ? item.color : 'black',
                maxWidth: '80%',
                fontFamily: 'balooBhai2',
                letterSpacing: 0.6
              }]"
            >
              {{ item.name_category }}
            </text>
          </view>

          <text
            :style="[{
                color: selectIndex == index + 3 ? item.color : 'black',
                fontFamily: 'balooBhai2'
              }]"
          >{{ item.countTasks }}</text>
        </view>
      </ripple>
    </scroll-view>
  </SafeAreaView>
</template>

<style>
.container {
  flex: 1;
  background-color: #f7f6ff;
}

.user-wrapper {
  margin-top: 25;
  padding-horizontal: 12;
  align-items: flex-start;
}

.user-img-container {
  border-width: 3;
  border-radius: 100;
  border-color: #4385f5;
}

.user-img {
  width: 75;
  height: 75;
  border-radius: 50;
  margin-bottom: 14;
}

.user-img-ripple {
  width: 75;
  height: 75;
  margin: 2;
}

.user-name {
  margin-top: 13;
  font-size: 22;
  font-family: balooBhai2Medium;
  max-width: 95%;
  letter-spacing: 0.6;
}

.user-email {
  font-size: 18;
  font-family: balooBhai2;
}

.user-id {
  font-size: 19;
  margin-top: 10;
}

.drawer-section-container {
  padding: 2;
  margin-horizontal: 7;
}

.drawer-section-item {
  flex-direction: row;
  align-items: center;
  border-radius: 10;
  padding-horizontal: 10;
  padding-vertical: 8;
  margin-bottom: 7;
}

.category-container {
  margin-horizontal: 7;
  padding-horizontal: 8;
  padding-vertical: 5;
  border-radius: 10;
  margin-bottom: 7;
}

.category-item {
  flex-direction: row;
  align-items: center;
  margin: 8;
  justify-content: space-between;
}

.circle {
  width: 12;
  height: 12;
  border-width: 2.7;
  border-radius: 5;
  margin-right: 15;
}
</style>