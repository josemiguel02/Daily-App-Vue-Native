import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
// Screens
import HomeScreen from '../screens/HomeScreen.vue'
import ProfileScreen from '../screens/ProfileScreen.vue'
import CategoriesScreen from '../screens/CategoriesScreen.vue'
import ListCategoryScreen from '../screens/ListCategoryScreen.vue'
// CustomDrawer
import DrawerContent from '../components/DrawerContent.vue'

const Drawer = createDrawerNavigator()

export default function DrawerNavigation ({ doLogout }) {
  return (
    <Drawer.Navigator
      initialRouteName='HomeScreen'
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name='HomeScreen' component={HomeScreen} />
      <Drawer.Screen name='ProfileScreen'>
        {props => <ProfileScreen {...props} doLogout={doLogout} />}
      </Drawer.Screen>
      <Drawer.Screen name='CategoriesScreen' component={CategoriesScreen} />
      <Drawer.Screen name='ListCategoryScreen' component={ListCategoryScreen} />
    </Drawer.Navigator>
  )
}
