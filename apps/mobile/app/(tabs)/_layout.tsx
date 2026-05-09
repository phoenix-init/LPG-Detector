import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import CustomNavBar from '@/components/tab-bar/CustomNavbar'
import { authClient } from '@/lib/auth-client'
import { useUser } from '@/store/useUser'

const TabLayout = () => {
  const { data: session } = authClient.useSession()
  const { setUser, clearUser } = useUser()

  useEffect(() => {
    if (session?.user) {
      setUser({
        id:             session.user.id,
        name:           session.user.name,
        email:          session.user.email ?? undefined,
        phoneNumber:    (session.user as any).phoneNumber ?? undefined,
        profilePicture: session.user.image ?? undefined,
      })
    } else {
      clearUser()
    }
  }, [session, setUser, clearUser])

  return (
    <Tabs
      screenOptions={{ 
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' }
      }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tabs.Screen name="index"     options={{ title: 'Home'      }} />
      <Tabs.Screen name="settings"  options={{ title: 'Settings'  }} />
    </Tabs>
  )
}

export default TabLayout