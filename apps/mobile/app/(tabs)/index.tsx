import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConnectionStatus from '@/components/ui/ConnectionStatus'
import LeakDetection from '@/components/home/LeakDetection'
import GasValve from '@/components/home/GasValve'
import SystemDiagnosticCard from '@/components/home/SystemDiagnosticCard'
import { Activity, BatteryCharging, History } from 'lucide-react-native'


const index = () => {

  const SystemDiagnosticItems: SystemDiagnosticCardProps[] = [
      {
          id: 1,
          title: "Sensor Status",
          reading: "Connected",
          icon: Activity
      },
      {
          id: 2,
          title: "Power Source",
          reading: "AC Adapter",
          icon: BatteryCharging
      },
      {
          id: 3,
          title: "Active Leaks",
          reading: "None",
          icon: History
      }
  ]

  const leakDetectionProps: LeakDetectionProps = {
    status: "Leak",
    message: "Leak Detected!",
    description: "Critical gas levels. Evacuate immediately."
  }

  const handleValvePress = () => {
    console.log("Valve pressed"); 
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-8 pt-4 pb-[120px] gap-y-6"
      >
        <View>
            <Text className='font-sf-regular text-white/[0.44] tracking-wide text-[24px]'>LPG Safety Unit</Text>
            <ConnectionStatus isConnected={true} />
        </View>
        
        <LeakDetection {...leakDetectionProps} />
        <GasValve onPress={handleValvePress} />

        <Text className='font-sf-semibold text-white/[0.45] text-[16px] tracking-wide'>
          System Diagnostics
        </Text>
        <SystemDiagnosticCard items={SystemDiagnosticItems} />
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default index