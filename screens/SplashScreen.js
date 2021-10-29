import { StatusBar } from 'expo-status-bar'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const SplashScreen = () => {
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
          style={{ width: '80%' }}
          autoPlay
          loop
        />

        <Text style={{
          marginTop: 20,
          fontSize: 20,
          fontFamily: 'balooBhai2SemiBold'
        }}
        >JS.Do App!
        </Text>
      </SafeAreaView>
    </>
  )
}
