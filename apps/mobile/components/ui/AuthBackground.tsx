import { ImageBackground, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

const AuthBackground = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ImageBackground
        source={require('@/assets/images/background_image.png')} 
        resizeMode="cover"
        className="flex-1 w-full h-full" 
      >
        {children}
      </ImageBackground>
    </View>
  )
}

export default AuthBackground