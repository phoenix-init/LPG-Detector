import React from 'react'
import { Tabs } from 'expo-router'
import CustomNavBar from '@/components/tab-bar/CustomNavbar'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ 
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' }
      }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tabs.Screen name="index"     options={{ title: 'Home'      }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
      <Tabs.Screen name="settings"  options={{ title: 'Settings'  }} />
    </Tabs>
  )
}

export default TabLayout