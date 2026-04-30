import "@/global.css"
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";

const RootContent = () => {

  const [fontsLoaded] = useFonts({
    'sf-regular': require('@/assets/fonts/SF-Pro-Rounded-Regular.ttf'),
    'sf-semibold': require('@/assets/fonts/SF-Pro-Text-Semibold.otf'),
    'sf-light': require('@/assets/fonts/sf-pro-text-light.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(connected)" />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <RootContent />
      <StatusBar style="light" />
    </ThemeProvider>
  )
}
