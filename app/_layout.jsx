import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font"
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  let [fontsLoaded, error] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  })

  useEffect(() => {
    if (error) throw error
    if(fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Home/Home" options={{ headerShown: false }} />
      <Stack.Screen name="Movie/Movie" options={{ headerShown: false }} />
      <Stack.Screen name="Person/Person" options={{ headerShown: false }} />
      <Stack.Screen name="Search/Search" options={{ headerShown: false }} />
    </Stack>
  );
}
