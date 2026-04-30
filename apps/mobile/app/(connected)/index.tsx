import { Text, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AuthBackground from '@/components/ui/AuthBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/components/ui/InputField'
import LiquidGlassButton from '@/components/ui/LiquidGlass'
import { Link, Redirect } from 'expo-router'
import { BlurView } from 'expo-blur'
import Modal from 'react-native-modal'
import { icons } from '@/constants/icon'
import App from '@/components/camera/Scanner'
import { useQrStore } from '@/store/useQrStore'
import { useLoadingStore } from '@/store/useLoading'
import VerifyLoader from '@/components/loader/VerifyLoader'
import { useFinishLoadingStore } from '@/store/useFinishLoading'
import { useDeviceIdStore } from '@/store/useDeviceId'

const Index = () => {
  
  const { deviceId, setDeviceId } = useDeviceIdStore()
  
  const [error, setError] = useState<string | null>(null)
  const { isOpeningQR, setIsOpeningQR } = useQrStore()
  const { isVerifying, setIsVerifying } = useLoadingStore();
  const { isFinished } = useFinishLoadingStore();

  if (isOpeningQR)
    return <App />

  if (isVerifying) {
    return <VerifyLoader />;
  }

  if (isFinished) {
    return <Redirect href="/SuccessScreen" />
  }

  const handleConnect = () => {
    console.log("Form Data to send to backend:", deviceId)
    if (!deviceId) {
      setError("Please enter a Device ID");
      return;
    }
    setDeviceId(deviceId);
    setIsVerifying();
    
    // Send form data to backend here
    // Simulating a backend error
    // TODO: when checking the device ID, if the device ID is valid, store it in a zustand store
    // and then
  }

  return (
    <AuthBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal 
          isVisible={!!error} 
          animationIn="slideInDown" 
          animationOut="slideOutUp" 
          backdropOpacity={0.6} 
          onBackdropPress={() => setError(null)}
          style={{ margin: 0, justifyContent: 'flex-start', paddingTop: 60, paddingHorizontal: 20 }}
        >
          <View className="rounded-[24px] overflow-hidden">
            <BlurView intensity={80} tint="dark" className="px-5 py-4 bg-red-950/80 flex-row items-center justify-between">
              {/* Safe inner border that won't clip */}
              <View className="absolute inset-0 rounded-[24px] border-[1.5px] border-red-500/60" />
              <Text className="text-red-50 text-[15px] font-sf-semibold flex-1 mr-4">{error}</Text>
              <TouchableOpacity onPress={() => setError(null)} className="p-1">
                <Text className="text-white/70 text-[18px] font-sf-semibold">✕</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </Modal>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="auth-screen"
        >
          <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
          >
            <View className='items-center mt-16 mb-10'>
              <Text className='text-white/[0.44] text-[48px] font-sf-regular tracking-wide'>Link Your Device</Text>
              <Text className='text-white/[0.44] text-[18px] -mt-5 font-sf-regular tracking-wide'>Enter the unique device ID provided</Text>
              <Text className='text-white/[0.44] text-[18px] -mt-5 font-sf-regular tracking-wide'>with your system.</Text>
            </View>

            <View className='w-full flex justify-center items-center px-8 mt-12'>
              <InputField 
                type='text'
                placeholder="Device ID: “e.g. LPG-AX92K7”" 
                value={deviceId}
                onChangeText={(value) => setDeviceId(value)}
              />
              <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="mt-2">
                {/* Fixed the underline issue using inline styles */}
                <Text 
                  className='text-white/[0.44] text-[12px] font-sf-light tracking-wider'
                  style={{ textDecorationLine: 'underline' }}
                >
                  Where is my Device ID?
                </Text>
              </Link>
            </View>


            <View className='w-full items-center gap-y-5 mt-5 mb-8'>
              <LiquidGlassButton
                title="Connect" 
                onPress={handleConnect} 
                className="w-56 h-14"
                textClassName="text-lg"
              />
            </View>

            <View className="w-full items-center mt-6 mb-8 gap-y-6">
              <View className="flex-row items-center justify-center gap-x-4">
                <View className="h-[1px] w-16 bg-white/20" />
                <Text className="text-white/40 text-sm font-sf-light">OR SCAN</Text>
                <View className="h-[1px] w-16 bg-white/20" />
              </View>

              {/* QR Code Button Wrapper */}
              <LiquidGlassButton
                onPress={setIsOpeningQR} 
                icon={icons.qr}
                className="w-20 h-20 rounded-full flex items-center justify-center flex-row"
                iconSize="w-14 h-14"
              />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthBackground>
  )
}

export default Index
