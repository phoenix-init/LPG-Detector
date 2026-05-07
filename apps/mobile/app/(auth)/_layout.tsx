import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { authClient } from '@/lib/auth-client'

const Layout = () => {

  const { data: isSignedIn } = authClient.useSession();
  
  if(isSignedIn) {
    return <Redirect href="/(tabs)" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}/>
  )
}

export default Layout