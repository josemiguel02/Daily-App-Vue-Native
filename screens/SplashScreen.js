import { StatusBar } from 'expo-status-bar'
import LottieView from 'lottie-react-native'
import React from 'react'
import { Text } from 'react-native'
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
          style={{ width: '90%' }}
          autoPlay
          loop
        />

        <Text style={{
          marginTop: 22,
          fontSize: 30,
          fontFamily: 'balooBhai2SemiBold',
          letterSpacing: 1.5
        }}
        >
          JS.Do App!
        </Text>
      </SafeAreaView>
    </>
  )
}
