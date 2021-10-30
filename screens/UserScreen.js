import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginScreen from './LoginScreen.vue'
import RegisterScreen from './RegisterScreen.vue'
import Ripple from 'react-native-material-ripple'

export default function UserScreen ({ navigation, doLogin }) {
  const [indexTab, setIndexTab] = useState(0)
  const { height, width } = useWindowDimensions()
  const windowHeight = (height * 6) / 100
  const scrollview = useRef()

  const switchTab = (index) => {
    setIndexTab(index)
    scrollview.current.scrollTo({ x: index, animated: true })
  }

  return (
    <>
      <StatusBar backgroundColor='transparent' style='dark' />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#f7f6ff'
        }}
      >

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={[styles.header, { marginTop: windowHeight }]}>
            <Image
              source={require('../assets/tasks-logo.png')}
              style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>Welcome to JS.Do App!</Text>
          </View>

          <View style={styles.tabContainer}>
            <Ripple
              style={styles.tabItem}
              rippleContainerBorderRadius={8}
              onPress={() => switchTab(0)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: indexTab === 0 ? '#4385f5' : 'black',
                    fontFamily: indexTab === 0 ? 'balooBhai2Medium' : 'balooBhai2',
                    marginBottom: 7,
                    letterSpacing: 0.6
                  }
                ]}
              >
                Login
              </Text>

              {indexTab === 0 && <View style={styles.tabDot} />}
            </Ripple>

            <Ripple
              style={[styles.tabItem, { marginLeft: 0 }]}
              rippleContainerBorderRadius={8}
              onPress={() => switchTab(width)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: indexTab !== 0 ? '#4385f5' : 'black',
                    fontFamily: indexTab !== 0 ? 'balooBhai2Medium' : 'balooBhai2',
                    marginBottom: 7,
                    letterSpacing: 0.6
                  }
                ]}
              >
                Sign Up
              </Text>
              {indexTab !== 0 && <View style={styles.tabDot} />}
            </Ripple>
          </View>
          <ScrollView
            ref={scrollview}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const { x } = nativeEvent.contentOffset
              if (x === 0) {
                setIndexTab(0)
              } else if (x >= 360) {
                setIndexTab(x)
              }
            }}
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
    fontFamily: 'balooBhai2'
  },

  tabDot: {
    width: 50,
    height: 4,
    backgroundColor: '#4385f5',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  }
})
