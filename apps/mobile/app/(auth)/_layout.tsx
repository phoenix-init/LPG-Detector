import React from 'react'
import { Redirect, Stack } from 'expo-router'

const Layout = () => {
  const isSignedIn = true;
  const isSuccess = true;

  if(isSuccess) {
    return <Redirect href="/(tabs)" />
  }

  if(isSignedIn) {
    return <Redirect href="/(connected)" />
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}/>
  )
}

export default Layout