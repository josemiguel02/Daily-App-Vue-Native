import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export const getMediaLibraryPermissions = async () => {
  if (Constants.platform.android || Constants.platform.ios) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Warning', 'You need to activate the permissions...')
    }
  }
}

export const getCameraPermissions = async () => {
  if (Constants.platform.android || Constants.platform.ios) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Warning', 'You need to activate the permissions...')
    }
  }
}
