import { View, Text } from 'react-native'
import React from 'react'
import SmogCard from '../ui/SmogCard'
import LiquidGlassButton from '../ui/LiquidGlass'
import { Power } from 'lucide-react-native'
import { useUser } from '@/store/useUser'

const GasValve = ({ onPress }: { onPress: () => void }) => {

  const { user } = useUser();
  const isValveOpen = user?.devices[0].valveOpen;

  return (
    <SmogCard>
        <View className="flex-1 w-full pt-6 px-6 pb-6">
            <View className='flex-row w-full items-center justify-between'>
                <Text className='font-sf-regular text-white/[0.60] tracking-wide text-[15px]'>Main Gas Valve</Text>
                <Text className='font-sf-regular text-[#B8FFCB] tracking-wide text-[15px]'>{isValveOpen ? "OPEN" : "CLOSED"}</Text>
            </View>
            <View className="flex-1 items-center justify-center">
                <LiquidGlassButton 
                  icon={Power} 
                  iconSize='w-6 h-6'
                  onPress={onPress} 
                  title={isValveOpen ? "Close Gas Valve" : "Open Gas Valve"} 
                  textClassName='text-[16px]'
                  className="w-52 h-[47px]"
                />
            </View>
        </View>
    </SmogCard>
  )
}

export default GasValve