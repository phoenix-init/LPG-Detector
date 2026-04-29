import { TouchableOpacity, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function LiquidGlassButton({ onPress, title }: { onPress: () => void, title: string }) {
  return (
    <TouchableOpacity onPress={onPress} className="active:opacity-80 w-64 h-16">
      <View className="flex-1 rounded-[32px] overflow-hidden">
        {/* intensity: 1 to 100 (how blurry it is)
          tint: "light", "dark", or "default" 
        */}
        <BlurView 
          intensity={40} 
          tint="light" 
          className="flex-1 justify-center items-center"
        >
          {/* This absolute View creates the "glass edge" highlight without a gradient */}
          <View className="absolute inset-0 rounded-[32px] border border-white/20 border-t-white/60" />
          
          <Text className="text-white text-xl font-sf-rounded-bold tracking-wide shadow-sm shadow-black/50">
            {title}
          </Text>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
}