import React, { useState, useEffect, useCallback } from 'react'
import {
  NavigationContainer
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
// Screens
import DetailScreen from '../screens/DetailScreen.vue'
import AddCategoryScreen from '../screens/AddCategoryScreen.vue'
import UserScreen from '../screens/UserScreen'
// Authentication
import { getIsUserLogin } from '../services/auth_persistent.js'
// SafeArea Provider
import { SafeAreaProvider } from 'react-native-safe-area-context'
// Drawer Navigation
import DrawerNavigation from './DrawerNavigation'
// Expo Font
import * as Font from 'expo-font'
// Lottie
import LottieView from 'lottie-react-native'
import { View } from 'react-native'

const Stack = createStackNavigator()

function MyNavigator () {
  const [isLogin, setIsLogin] = useState(null)

  const setAuth = async () => {
    const res = await getIsUserLogin()
    setTimeout(() => {
      setIsLogin(res)
    }, 2000)
  } 

  useEffect(() => {
    setAuth()
    console.log(isLogin)
  }, [isLogin])

  const doLoginAndLogout = useCallback(() => {
    setTimeout(() => setIsLogin(value => !value), 2000)
  }, [])

  if (isLogin == null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F7F6FF'
        }}
      >
        <LottieView
          source={require('../animations/successful.json')}
          style={{ width: '80%', aspectRatio: 1 }}
          autoPlay
          loop
        />
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {isLogin
        ? (
          <>
            <Stack.Screen name='DrawerNavigation'>
              {props => (
                <DrawerNavigation {...props} doLogout={doLoginAndLogout} />
              )}
            </Stack.Screen>
            <Stack.Screen name='DetailScreen' component={DetailScreen} />
            <Stack.Screen
              name='AddCategoryScreen'
              component={AddCategoryScreen}
            />
          </>
          )
        : (
          <>
            <Stack.Screen name='UserScreen'>
              {props => <UserScreen {...props} doLogin={doLoginAndLogout} />}
            </Stack.Screen>
          </>
          )}
    </Stack.Navigator>
  )
}

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppNavigation
