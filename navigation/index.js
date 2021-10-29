import React, { useState, useLayoutEffect, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Screens
import UserScreen from '../screens/UserScreen'
import DetailScreen from '../screens/DetailScreen.vue'
import AddCategoryScreen from '../screens/AddCategoryScreen.vue'
import EditCategoryScreen from '../screens/EditCategoryScreen.vue'
// Authentication
import { getCredentials, getIsUserLogin } from '../services/auth_persistent.js'
// SafeArea Provider
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
// Drawer Navigation
import DrawerNavigation from './DrawerNavigation'
// Lottie
import LottieView from 'lottie-react-native'
import { StatusBar } from 'expo-status-bar'

const Stack = createStackNavigator()

function MyNavigator () {
  const [isLogin, setIsLogin] = useState(null)

  const setAuth = async () => {
    const res = await getIsUserLogin()
    setIsLogin(res)
  }

  useLayoutEffect(() => {
    setAuth()
    console.log(isLogin)
  }, [])

  const doLoginAndLogout = useCallback(() => {
    setTimeout(() => setIsLogin(value => !value), 1500)
  }, [])

  if (isLogin == null) {
    return (
      <>
        <StatusBar backgroundColor='transparent' style='dark' />
        <SafeAreaView
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
        </SafeAreaView>
      </>
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
            <Stack.Screen
              name='EditCategoryScreen'
              component={EditCategoryScreen}
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
