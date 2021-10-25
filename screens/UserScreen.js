import React, { useState } from 'react'
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
  const [tabs, setTabs] = useState(false)
  const { height } = useWindowDimensions()
  const windowHeight = (height * 6) / 100

  return (
    <>
      <StatusBar backgroundColor='transparent' style='dark' />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#f7f6ff'
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              onPress={() => setTabs(false)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: !tabs ? '#4385f5' : 'black',
                    fontFamily: !tabs ? 'balooBhai2Medium' : 'balooBhai2',
                    marginBottom: 7,
                    letterSpacing: 0.6
                  }
                ]}
              >
                Login
              </Text>

              {!tabs && <View style={styles.tabDot} />}
            </Ripple>

            <Ripple
              style={[styles.tabItem, { marginLeft: 0 }]}
              rippleContainerBorderRadius={8}
              onPress={() => setTabs(true)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: tabs ? '#4385f5' : 'black',
                    fontFamily: tabs ? 'balooBhai2Medium' : 'balooBhai2',
                    marginBottom: 7,
                    letterSpacing: 0.6
                  }
                ]}
              >
                Register
              </Text>

              {tabs && <View style={styles.tabDot} />}
            </Ripple>
          </View>

          {tabs ? <RegisterScreen /> : <LoginScreen doLogin={doLogin} />}
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
    fontFamily: 'balooBhai2'
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
