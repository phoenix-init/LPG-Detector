import { TouchableOpacity, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function LiquidGlassButton({ onPress, title, icon, className, textClassName, disabled, iconClassName, iconSize }: LiquidGlassButtonProps & { textClassName?: string }) {
  
  const IconComponent = icon as any;


  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} className={`active:opacity-80 ${className || 'w-64 h-16'} ${disabled ? 'opacity-40' : ''}`}>
      <View className="flex-1 rounded-[32px] overflow-hidden">
        {/* intensity: 1 to 100 (how blurry it is)
          tint: "light", "dark", or "default" 
        */}
        <BlurView 
          intensity={25} 
          tint="default" 
          className="flex-1 flex-row justify-center items-center gap-x-3 px-4 bg-white/[0.08]"
        >
          {/* This absolute View creates the "glass edge" highlight and inner glow */}
          <View className="absolute inset-0 rounded-[32px] border-[1.5px] border-l-white/40 border-t-white/80 border-r-white/70 border-b-white/60" />

          {icon && <IconComponent className={`${iconSize || 'w-8 h-8'} ${iconClassName || ""}`} color="white" />}
          
          {title && (
            <Text numberOfLines={1} className={`text-white font-sf-semibold tracking-wide shadow-sm shadow-black/50 ${textClassName || 'text-xl'}`}>
              {title}
            </Text>
          )}
        </BlurView>
      </View>
    </TouchableOpacity>
  );
}