import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { authClient } from '@/lib/auth-client'

const Layout = () => {

  // const { data: isSignedIn } = authClient.useSession();
  const isSignedIn = true;
  
  if(isSignedIn) {
    return <Redirect href="/(tabs)" />
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade' }}/>
  )
}

export default Layout