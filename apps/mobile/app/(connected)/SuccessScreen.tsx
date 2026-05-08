import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { useDeviceIdStore } from '@/store/useDeviceId'
import LiquidGlassButton from '@/components/ui/LiquidGlass'
import { router } from 'expo-router'

export default function SuccessScreen() {
  const { deviceId } = useDeviceIdStore();
   
  return (
      <SafeAreaView style={{ flex: 1 }}>
        
        <View className='items-center mt-16 mb-10'>
          <Text className='text-white/[0.44] text-[38px] font-sf-regular tracking-wide'>
            Device Connected
          </Text>
        </View>

        <View className="px-8 mt-4">
          <View className="rounded-[24px] overflow-hidden">
            <BlurView 
              intensity={50}
              tint="dark" 
              className="px-6 py-10 bg-[#1A1A1A]/[0.64] items-start gap-y-5"
            >
              <View className="absolute inset-0 rounded-[24px] border border-white/[0.08] border-t-white/[0.15]" />

              <Text className="text-white/[0.36] text-[16px] font-sf-semibold tracking-wide">
                Device Name: LPG Safety Unit
              </Text>
              
              <Text className="text-white/[0.29] text-[16px] font-sf-semibold tracking-wide">
                Device ID: {deviceId}
              </Text>
              
              <Text className="text-[#35F400]/[0.57] text-[16px] font-sf-semibold tracking-wide mt-2">
                Status: Online
              </Text>
              
            </BlurView>
          </View>
        </View>

        <View className='px-8 mt-16 flex items-center'>
            <Text className='text-white/[0.5] text-[16px] font-sf-semibold tracking-wide'>
                You&apos;re now connected and ready to
            </Text>
            <Text className='text-white/[0.5] text-[16px] font-sf-semibold tracking-wide'>
                monitor your system.
            </Text>

            <LiquidGlassButton 
              title='Go to Dashboard' 
              className='w-56 h-14 mt-12'
              textClassName='text-lg'
              onPress={() => {
                router.push("/(tabs)");
              }}
            />
        </View>

      </SafeAreaView>
  )
}