import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LiquidGlassButton from '@/components/ui/LiquidGlass';
import { router } from 'expo-router';

const Welcome = () => {
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center relative">
            <Text className='text-7xl text-white/[0.44] font-sf-regular tracking-wide'>
              Welcome
            </Text>

            <View className='absolute bottom-24'>
              <LiquidGlassButton title="Let's Get Started" onPress={() => router.replace('/(auth)/sign-up')} />
            </View>
        </View>
      </SafeAreaView>
  );
}

export default Welcome;