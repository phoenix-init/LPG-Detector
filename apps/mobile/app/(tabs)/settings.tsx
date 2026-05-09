import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@/store/useUser'
import { LogOut } from 'lucide-react-native'
import { authClient } from '@/lib/auth-client'
import { router } from 'expo-router'

const Settings = () => {
  const { user, clearUser } = useUser();

  const handleLogout = async () => {
    await authClient.signOut()
    clearUser()
    router.replace('/(auth)/sign-in')
    
  }
  return (
    <SafeAreaView>
      <View>
        <Text className='text-white text-[20px]'>settings</Text>
        <Text className='text-white text-[20px]'>{user?.name}</Text>
        <Text className='text-white text-[20px]'>{user?.email}</Text>
        <Text className='text-white text-[20px]'>{user?.phoneNumber}</Text>
        {user?.profilePicture && <Image source={{ uri: user.profilePicture }} className='w-20 h-20 rounded-full' />}
      </View>
      <View>
        <TouchableOpacity onPress={handleLogout} className='mt-20 ml-5'>
          <LogOut color={"red"} size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Settings