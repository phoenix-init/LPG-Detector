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
                    <View className='flex-1 justify-center p-4 gap-y-3'>
                        <View className="flex-row items-center gap-x-2">
                            <item.icon color="white" size={18} />
                            <Text 
                                className="text-white font-sf-light tracking-wide text-[13px] flex-1"
                                numberOfLines={2}
                            >
                                {item.title}
                            </Text>
                        </View>
                        <Text className="font-sf-semibold tracking-wide text-[#4CFF1A]/[0.57] text-[14px]">{item.reading}</Text>
                    </View>
                </SmogCard>
            )
        })}
    </View>
  )
}

export default SystemDiagnosticCard