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
      let date = dayjs().format('ddd, MMM D YYYY')
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
    <text class="header-title">{{ greeting }}</text>
    <text class="header-name">{{ !user.name ? 'User' : user.name }}</text>
    <text class="header-datetime">{{ dateTime }}</text>
    </view> 
</template>

<style>
.header {
  margin-left: 26;
  margin-top: 10;
}

.header-title {
  font-family: ralewaySemiBold;
  font-size: 26;
  color: #1d1d1d;
}

.header-name {
  font-size: 19;
  margin-top: 4;
  color: #1d1d1d;
  font-family: ralewaySemiBold;
}

.header-datetime {
  margin-top: 4;
  color: #074486;
  font-size: 18;
  font-family: ralewayMedium;
}
</style>