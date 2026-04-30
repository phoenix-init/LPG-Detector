import { Image, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AuthBackground from '../ui/AuthBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icon'
import ProgressBar from './ProgressBar'
import { useFinishLoadingStore } from '@/store/useFinishLoading'
import { useLoadingStore } from '@/store/useLoading'

export default function VerifyLoader() {
  const [progress, setProgress] = useState(0);
  const { setIsFinished } = useFinishLoadingStore();
  const { setIsVerifying } = useLoadingStore();

  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeoutId: number; 

    if (progress === 100) {
      timeoutId = setTimeout(() => {
        setIsFinished(); 
        setIsVerifying(); 
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [progress, setIsFinished, setIsVerifying]);

  return (
    <AuthBackground>
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
        
        <View className='items-center mt-16'>
          <Text className='text-white/[0.6] text-[36px] font-sf-regular tracking-wide'>
            Verifying Access…
          </Text>
        </View>

        <View className='flex-1 justify-center items-center px-8'>
          <Image 
            source={icons.loader} 
            className='w-[216px] h-[93px]'
            resizeMode="contain"
          />
        </View>


        <View className="w-full mb-12">
          
          <View className="w-full items-center mb-10">
            
            <View className="gap-y-0 items-start px-12 w-full"> 
              <Text className='text-white/[0.44] text-[18px] font-sf-regular tracking-wide'>
                Checking device availability...
              </Text>
              <Text className='text-white/[0.44] text-[16px] font-sf-regular tracking-wide'>
                Validating credentials...
              </Text>
              <Text className='text-white/[0.44] text-[16px] font-sf-regular tracking-wide'>
                Syncing with server...
              </Text>
            </View>
          </View>

          <ProgressBar progress={progress} />

        </View>

      </SafeAreaView>
    </AuthBackground>
  )
}