import { View, Text } from 'react-native'
import React from 'react'
import SmogCard from '../ui/SmogCard'

const SystemDiagnosticCard = ({ items }: { items: SystemDiagnosticCardProps[] }) => {
  return (
    <View className='flex-row flex-wrap justify-between gap-y-4'>
        {items.map((item) => {
            return (
                <SmogCard 
                    key={item.id}
                    className="w-[48%]"
                    containerClassName="h-[110px]"
                >
                    <View className='flex-1 justify-center p-4 gap-y-1.5'>
                        <View className="mb-1">
                            <item.icon color="white" size={26} />
                        </View>
                        <Text 
                            className="text-white font-sf-light tracking-wide text-[15px]"
                            numberOfLines={1}
                        >
                            {item.label}
                        </Text>
                        <Text className="font-sf-semibold tracking-wide text-[#4CFF1A]/[0.57] text-[14px]">{item.reading}</Text>
                    </View>
                </SmogCard>
            )
        })}
    </View>
  )
}

export default SystemDiagnosticCard