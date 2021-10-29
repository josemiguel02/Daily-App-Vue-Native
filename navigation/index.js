import React, { useState, useLayoutEffect, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Screens
import UserScreen from '../screens/UserScreen'
import DetailScreen from '../screens/DetailScreen.vue'
import AddCategoryScreen from '../screens/AddCategoryScreen.vue'
import EditCategoryScreen from '../screens/EditCategoryScreen.vue'
import { SplashScreen } from '../screens/SplashScreen'
// Authentication
import { getIsUserLogin } from '../services/auth_persistent.js'
// SafeArea Provider
import { SafeAreaProvider } from 'react-native-safe-area-context'
// Drawer Navigation
import DrawerNavigation from './DrawerNavigation'

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
    setTimeout(() => setIsLogin(value => !value), 2000)
  }, [])

  if (isLogin === null) {
    return <SplashScreen />
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
