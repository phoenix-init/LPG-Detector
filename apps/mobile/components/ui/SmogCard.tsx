import { View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

interface SmogCardProps {
  children: React.ReactNode;
  className?: string; // For the outer wrapper
  containerClassName?: string; // For the inner rounded container
}

const SmogCard = ({ children, className, containerClassName }: SmogCardProps) => {
  return (
    <View className={`${className || 'w-full'}`}>
        <View className={`w-full rounded-[30px] overflow-hidden ${containerClassName || 'h-52'}`}>
            <BlurView 
              intensity={50}
              tint="dark" 
              className="flex-1 bg-[#908F8F]/13"
            >
                {/* Stroke: white 10% */}
                <View className="absolute inset-0 rounded-[30px] border border-white/10 pointer-events-none" />
                {children}
            </BlurView>
        </View>
    </View>
  )
}

export default SmogCard