import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import CustomNavBar from '@/components/tab-bar/CustomNavbar'
import { authClient } from '@/lib/auth-client'
import { useUser } from '@/store/useUser'
import axios from 'axios'
// import usePushNotifications from '@/hooks/usePushNotification'

const TabLayout = () => {
  const { data: session } = authClient.useSession()
  const { setUser } = useUser()

  // usePushNotifications(session?.user?.id);

  useEffect(() => {
    const fetchUserDetails = async() => {
      try{
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${session?.session.token}`,
            "Content-Type": "application/json"
          }
        })

        if(response.data.success){
          setUser(response.data.data)
        }

      }catch(error){
        console.error("Failed to fetch user details:", error);
      }
    }

    if (session?.session.token){
      fetchUserDetails();
    }
    
  }, [session, setUser])

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