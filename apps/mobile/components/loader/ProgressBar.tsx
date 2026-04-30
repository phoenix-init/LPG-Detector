import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressBarProps {
  progress: number; 
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View className="w-full px-10">
      <Text className="text-white/60 text-[15px] font-sf-regular text-center mb-3">
        This may take a few seconds
      </Text>

      <View className="w-full h-[18px] justify-center px-1 relative">
        <View className="absolute inset-0 rounded-full bg-[#292929]/[0.2] overflow-hidden">
          <View
            style={{
              position: 'absolute',
              top: -15, left: -15, right: -15, bottom: -15,
              borderWidth: 15,
              borderColor: 'rgba(0,0,0,0.8)', 
              borderRadius: 999,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 4 }, 
              shadowOpacity: 0.9,
              shadowRadius: 5,
              elevation: 10,
            }}
          />
        </View>
        <View className="w-full h-full relative justify-center z-10">
          <LinearGradient
            colors={['#FF9600', '#FBFF00']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              borderRadius: 9,
              left: `${clampedProgress}%`,
              transform: [{ translateX: -9 }],
              shadowColor: '#FF9600',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 8,
            }}
          />
        </View>

      </View>

      <Text className="text-white font-inter-bold text-[15px] text-center mt-3">
        {Math.round(clampedProgress)} %
      </Text>
    </View>
  );
}