import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name='SuccessScreen' />
    </Stack>
  )
}

export default Layout