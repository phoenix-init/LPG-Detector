import { Text, View } from 'react-native'
import React from 'react'
import AuthBackground from '@/components/ui/AuthBackground';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  return (
    <AuthBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center relative">
            <Text className='text-7xl text-white/[0.44] font-sf-regular tracking-wide'>
              Welcome
            </Text>
        </View>
      </SafeAreaView>
    </AuthBackground>
  );
}

export default Welcome;