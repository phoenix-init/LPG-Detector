import React from 'react';
import { View, Text } from 'react-native';

interface ConnectionStatusProps {
  isConnected: boolean;
  /** Optional custom text to display next to the dot */
  label?: string; 
}

export default function ConnectionStatus({ isConnected, label }: ConnectionStatusProps) {
  return (
    // Container
    <View className="flex-row items-center space-x-2 py-1 rounded-full self-start">
      
      {/* Static Status Dot (No animations!) */}
      <View
        className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      
      {/* Status Text */}
      <Text
        className={`text-sm font-sf-light tracking-wide text-[15px] ${
          isConnected ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {label ? label : isConnected ? '   Connected' : '   Disconnected'}
      </Text>
      
    </View>
  );
}