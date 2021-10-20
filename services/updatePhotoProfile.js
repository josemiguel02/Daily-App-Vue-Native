/* eslint-disable no-undef */
import storage from '@react-native-firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import {
  getMediaLibraryPermissions,
  getCameraPermissions,
} from '../utils/user_permissions.js'

export const getPhotoOfLibrary = async () => {
  const response = { imgUri: null, res: null }
  await getMediaLibraryPermissions()

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    })

    if (!result.cancelled) {
      response.res = true
      response.imgUri = result.uri
    } else {
      response.res = false
    }
  } catch (error) {
    console.log(error)
    response.res = false
  }

  return response
}

export const takePhotoFromCamera = async () => {
  const result = { response: null, imgUri: null }
  await getCameraPermissions()

  try {
    const photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    })

    if (!photo.cancelled) {
      result.response = true
      result.imgUri = photo.uri
    } else {
      result.response = false
    }
  } catch (error) {
    console.log(error)
    result.response = false
  }

  return result
}

const formatExtensionImg = uriImg => {
  const filename = uriImg.substring(uriImg.lastIndexOf('/') + 1)
  const extension = filename.split('.').pop()
  return extension
}

export const uploadPhotoProfile = async (uriImg, userID) => {
  const result = { getUrlImg: null, statusResponse: null, porcentaje: null }

  try {
    const extension = formatExtensionImg(uriImg)
    const response = await fetch(uriImg)
    const imgBlob = await response.blob()
    const storageRef = storage().ref(`/photos/IMG_${userID}.${extension}`)
    const uploadImg = storageRef.put(imgBlob)

    uploadImg.on('state_changed', snapshot => {
      console.log(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
    })

    await uploadImg
    const urlImg = await storageRef.getDownloadURL()
    result.getUrlImg = urlImg
  } catch (error) {
    console.log(error)
  }

  return result
}
