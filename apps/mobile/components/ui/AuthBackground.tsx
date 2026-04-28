import { ImageBackground } from 'react-native'
import React from 'react'

const AuthBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackground
      source={require('@/assets/images/background_image.png')} 
      resizeMode="cover"
      className="flex-1 w-full h-full" 
    >
      {children}
    </ImageBackground>
  )
}

export default AuthBackground