<script>
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import store from '../store'

export default {
  data: () => ({
    dateTime: '',
    greeting: '',
  }),
  
  methods: {
    getDateTime() {
      dayjs.extend(localizedFormat)
      let date = dayjs().format('dddd, MMM D YYYY')
      this.dateTime = date
    },

    getGreeting() {
      let currentHour = dayjs().format('HH')
      if (currentHour < 12) {
        this.greeting = 'Good Morning!'
      } else if (currentHour == 12) {
        this.greeting = 'Good Noon!'
      } else if (currentHour >= 12 && currentHour <= 18) {
        this.greeting = 'Good Afternoon!'
      } else { 
        this.greeting = 'Good Evening!'
      }
    }
  },

  computed: {
    user: () => store.state.users,
  },

  created() {
    store.commit('getUserDataOfFireStore')
    this.getDateTime()
    this.getGreeting()
    setInterval(() => {
      this.getDateTime(), 
      this.getGreeting()
    },
    3000)
  },
}
</script>

<template>
    <view class="header">
    <text class="header-greeting">{{ greeting }}</text>
    <text class="header-name">{{ !user.name ? 'User' : user.name }}</text>
    <text class="header-datetime">{{ dateTime }}</text>
    </view> 
</template>

<style>
.header {
  margin-left: 26;
  margin-top: 10;
}

.header-greeting {
  font-family: balooBhai2Medium;
  font-size: 28;
  color: #2c2c2c;
  letter-spacing: 1.5;
}

.header-name {
  font-size: 22;
  color: #1d1d1d;
  font-family: balooBhai2Medium;
  letter-spacing: 1.5;
}

.header-datetime {
  margin-top: 4;
  color: #074486;
  font-size: 18;
  font-family: balooBhai2;
}
</style>