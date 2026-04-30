import { Text, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AuthBackground from '@/components/ui/AuthBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/components/ui/InputField'
import LiquidGlassButton from '@/components/ui/LiquidGlass'
import { icons } from '@/constants/icon'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import Modal from 'react-native-modal'

const SignIn = () => {
  
  const [form, setForm] = useState({
    phone: '',
    otp: ''
  })
  
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [disable, setDisable] = useState(false)

  const handleLogin = () => {
    console.log("Form Data to send to backend:", form)
    // Send form data to backend here
    // Simulating a backend error so you can see the UI!
    setError("Invalid OTP. Please check the code sent to your phone.")
  }

  const handleOTPSend = () => {
    console.log("OTP Sent from Backend:")
    setIsOtpSent(true)
    // Send form data to backend here
  }

  const handleGoogleAuth = () => {
    console.log("Google Auth")
    // Send form data to backend here
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
        >
          <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
          >
            <View className='items-center mt-16 mb-10'>
              <Text className='text-white/[0.44] text-[48px] font-sf-regular tracking-wide'>Welcome Back</Text>
            </View>

            <View className='w-full px-8 mb-6'>
              <InputField 
                type='numeric'
                placeholder="Mobile Number" 
                value={form.phone}
                maxLength={10}
                onChangeText={(value) => setForm({ ...form, phone: value })}
                rightElement={
                  <LiquidGlassButton disabled={disable} title="Send OTP" onPress={handleOTPSend} className="w-[105px] h-[46px]" textClassName="text-[13px]" />
                }
              />
              <InputField 
                type='numeric' 
                placeholder="Enter OTP" 
                maxLength={6}
                value={form.otp}
                onChangeText={(value) => setForm({ ...form, otp: value })}
                editable={isOtpSent}
              />
            </View>

            <View className='w-full items-center gap-y-5 mb-8'>

              <LiquidGlassButton 
                disabled={!form.phone || !form.otp}
                title="Log In" 
                onPress={handleLogin} 
                className="w-56 h-14"
                textClassName="text-lg"
              />
              <LiquidGlassButton 
                icon={icons.google} 
                title='Continue With Google' 
                onPress={handleGoogleAuth} 
                className="w-72 h-14"
                textClassName="text-lg"
              />
              <Text className="text-white/60 text-[12px] font-sf-regular mt-2 tracking-wider">
                By continuing, you agree to Terms & Privacy Policy
              </Text>
            </View>

            <View className="flex-1 min-h-[32px]" />

            <View className="flex-row items-center justify-between w-full px-10 mb-10">
              <Text className="text-white/50 text-[15px] font-sf-regular leading-tight">
                Don&apos;t have an account?
              </Text>
              <LiquidGlassButton 
                title="Sign Up" 
                onPress={() => router.push('/(auth)/sign-up')} 
                className="w-28 h-12"
                textClassName="text-base"
              />
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthBackground>
  )
}

export default SignIn
