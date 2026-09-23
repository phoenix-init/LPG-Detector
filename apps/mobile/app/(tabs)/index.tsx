import { Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LeakDetection from '@/components/home/LeakDetection'
import GasValve from '@/components/home/GasValve'
import SystemDiagnosticCard from '@/components/home/SystemDiagnosticCard'
import { Activity, BatteryCharging, History } from 'lucide-react-native'
import Header from '@/components/home/Header'
import { useUser } from '@/store/useUser'
import { useEffect } from 'react'
import axios from 'axios'
import { authClient } from '@/lib/auth-client'


const Index = () => {
  
  const { data: session } = authClient.useSession();
  const { user, updateDeviceStatus } = useUser();
  const sensorStatus = user?.devices?.[0];

  useEffect(() => {
    if (!sensorStatus?.serialNumber) return;
    
    const fetchLiveStatus = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/devices/${sensorStatus.serialNumber}/status`, {
          headers: {
            Authorization: `Bearer ${session?.session.token}`,
            "Content-Type": "application/json"
          }
        })

        console.log(response.data);

        if (response.data.success) {
         updateDeviceStatus(sensorStatus.serialNumber, response.data.data); 
        }
      } catch (error) {
        console.log("Error while fetching live status",error);
      }
    }

    const intervalId = setInterval(fetchLiveStatus, 1500);
    
    return () => clearInterval(intervalId);
  }, [sensorStatus?.serialNumber, updateDeviceStatus, session]);

  const isLeaking = sensorStatus?.isLeaking || false;
  const leakDetectionProps: LeakDetectionProps = {
    status: isLeaking ? "Leak" : "Safe",
    message: isLeaking ? "Leak Detected!" : "Safe to Use",
    description: isLeaking ? "Critical gas levels. Evacuate immediately." : "No gas leaks detected"
  }

  const SystemDiagnosticItems: SystemDiagnosticCardProps[] = [
      {
          id: 1,
          label: "Sensor Status",
          reading: sensorStatus?.maintenanceStatus ? "Maintenance" : "Optimal",
          icon: Activity
      },
      {
          id: 2,
          label: "Power Source",
          reading: sensorStatus?.powerSource as string,
          icon: BatteryCharging
      },
      {
          id: 3,
          label: "Active Leaks",
          reading: sensorStatus?.consecutiveLeakCount || 0,
          icon: History
      }
  ]

  const handleValvePress = async () => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/valve/${sensorStatus?.serialNumber}/update`, 
      {
        valveOpen: !sensorStatus?.valveOpen
      },
      {
        headers: {
          Authorization: `Bearer ${session?.session.token}`,
          "Content-Type": "application/json"
        }
      })
      if(response.data.success) {
        console.log("Valve toggled successfully", response.data);
        updateDeviceStatus(sensorStatus?.serialNumber as string, response.data.data);
      }
    } catch (error) {
      console.log("Error while toggling valve", error);
    } 
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-8 pt-4 pb-[120px] gap-y-6"
      >
        <Header />
        
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

export default Index