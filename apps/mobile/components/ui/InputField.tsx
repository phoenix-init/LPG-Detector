import { View, TextInput } from 'react-native'
import { BlurView } from 'expo-blur'

const InputField = ({ placeholder, type, rightElement, ...props }: InputFieldProps) => {
  const isDisabled = props.editable === false;

  return (
    <View className={`h-16 w-full mb-4 rounded-full overflow-hidden ${isDisabled ? 'opacity-40' : ''}`}>
      <BlurView 
        intensity={30} 
        tint="dark" 
        className={`flex-1 flex-row items-center pl-6 ${rightElement ? 'pr-[9px]' : 'pr-6'}`}
      >
        <View className="absolute inset-0 bg-[#1A1A1A]/[0.64]" />
        
        <View className="absolute inset-0 rounded-full" />
        
        <TextInput 
          placeholder={placeholder}
          inputMode={type}
          placeholderTextColor={'rgba(255, 255, 255, 0.29)'} 
          style={{
            fontFamily: "sf-semibold",
            fontSize: 16
          }}
          className='text-white flex-1'
          {...props}
        />
        {rightElement && (
          <View className="ml-2">
            {rightElement}
          </View>
        )}
      </BlurView>
    </View>
  )
}

export default InputField