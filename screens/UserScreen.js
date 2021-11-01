import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
  Animated
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginScreen from './LoginScreen.vue'
import RegisterScreen from './RegisterScreen.vue'
import Ripple from 'react-native-material-ripple'

export default function UserScreen ({ doLogin }) {
  const { height, width } = useWindowDimensions()
  const windowHeight = (height * 8) / 100
  const scrollview = useRef()
  const animation = useRef(new Animated.Value(0)).current

  const leftOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0]
  })

  const rightOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1]
  })

  const loginColor = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#4385f5', '#1b1b3366']
  })

  const singUpColor = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#1b1b3366', '#4385f5']
  })

  const switchTab = (index) => {
    scrollview.current.scrollTo(
      { x: index, animated: true }
    )
  }

  const Tabs = [
    { key: '1', label: 'Login', opacity: leftOpacity, color: loginColor, press: 0 },
    { key: '2', label: 'Sign Up', opacity: rightOpacity, color: singUpColor, press: width }
  ]

  return (
    <>
      <StatusBar backgroundColor='transparent' style='dark' />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f6ff' }}>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={[styles.header, { marginTop: windowHeight }]}>
            <Image
              source={require('../assets/tasks-logo.png')}
              style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>Welcome to JS.Do App!</Text>
          </View>

          <View style={styles.tabContainer}>
            {Tabs.map(({ label, key, opacity, color, press }) => (
              <Ripple
                key={key}
                style={styles.tabItem}
                rippleContainerBorderRadius={8}
                onPress={() => switchTab(press)}
              >
                <Animated.Text style={[styles.tabText, { color }]}>
                  {label}
                </Animated.Text>

                <Animated.View style={[styles.tabDot, {
                  opacity,
                  width: label.length * 10
                }]}
                />
              </Ripple>
            ))}
          </View>

          <ScrollView
            ref={scrollview}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: animation } } }],
              { useNativeDriver: false }
            )}
          >
            <LoginScreen style={{ width }} doLogin={doLogin} />
            <RegisterScreen style={{ width }} />
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center'
  },
  headerImage: {
    width: 120,
    height: 120
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 15,
    fontFamily: 'balooBhai2Medium'
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginHorizontal: 30
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    width: 90
  },
  tabText: {
    fontSize: 22,
    fontFamily: 'balooBhai2Medium',
    marginBottom: 7,
    letterSpacing: 0.6
  },

  tabDot: {
    width: 50,
    height: 4,
    backgroundColor: '#4385f5',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  }
})
