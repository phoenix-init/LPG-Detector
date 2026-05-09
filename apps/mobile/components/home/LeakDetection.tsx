import React from 'react'
import { View, Image, Text } from 'react-native'
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg'
import SmogCard from '@/components/ui/SmogCard'
import { icons } from '@/constants/icon'

interface RedGlowProps {
  size?: number
  color?: string
  opacity?: number
}

const RedGlow = ({
  size = 220,
  color = '#FF3B30',
  opacity = 0.45,
}: RedGlowProps) => {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
            <Stop offset="45%" stopColor={color} stopOpacity={opacity * 0.5} />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill="url(#glow)"
        />
      </Svg>
    </View>
  )
}

export default function LeakDetection(props: LeakDetectionProps) {
  const {status, message, description} = props

  const isLeak = status === "Leak"
  let messageColor = "";

  if (status === "Leak")
    messageColor = "text-[#EF4444]"
  else if (status === "Warning")
    messageColor = "text-[#FF8D28]"
  else
    messageColor = "text-white"

  return (
    <SmogCard>
      <View className='flex-1 w-full items-center justify-center gap-y-2 overflow-hidden'>

        {isLeak && <View className='absolute items-center justify-center'>
          <RedGlow size={240} opacity={0.35} />
        </View>}

        <View className="relative items-center justify-center mt-1">
          <Image
            source={icons.gas}
            className='w-[75px] h-[75px] z-10'
            resizeMode="contain"
          />
        </View>

        <View className='items-center'>
          <Text className={`font-sf-semibold tracking-wide text-[22px] ${messageColor}`}>
            {message}
          </Text>

          <Text className='font-sf-semibold text-white/[0.69] tracking-wide text-sm text-center'>
            {description}
          </Text>
        </View>

      </View>
    </SmogCard>
  )
}