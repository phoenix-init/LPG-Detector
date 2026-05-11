import { View, Text } from 'react-native'
import React from 'react'
import ConnectionStatus from '../ui/ConnectionStatus'
import { useUser } from '@/store/useUser'

const Header = () => {
  const { user } = useUser();

  const name = user?.devices[0].name
  const isConnected = user?.devices[0].isOnline

  return (
    <View>
        <View className='flex-row items-center gap-x-3 '>
            <Text className='font-sf-regular text-white/[0.44] tracking-wide text-[24px]'>{name}</Text>
        </View>
        <ConnectionStatus isConnected={isConnected as boolean} />
    </View>
  )
}

export default Header