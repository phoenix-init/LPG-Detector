import React from 'react';
import { TouchableOpacity, Text, View, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

export interface LiquidGlassButtonProps extends TouchableOpacityProps {
  title: string;
  width?: number | string;
  height?: number | string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function LiquidGlassButton({ 
  title, 
  width = 260, 
  height = 64, 
  containerStyle,
  ...props 
}: LiquidGlassButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={containerStyle} {...props}>
      {/* Outer container for the glassy look */}
      <View 
        className="rounded-full overflow-hidden border border-white/40 bg-white/10"
        style={{ width: width as any, height: height as any }}
      >
        {/* Top reflection highlight */}
        <View className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full" />
        
        {/* Subtle fill gradient for the glassy look */}
        <View className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10" />

        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-[20px] font-semibold tracking-wide">
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
