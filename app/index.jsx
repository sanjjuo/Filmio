import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router"


export default function Index() {
  const router = useRouter()
  return (
    <View className="flex justify-center items-center h-[110vh] bg-white">
      <View className='w-full h-[400px]'>
        <Image
          source={require("../assets/images/logo.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={() => router.push("/Home/Home")} className="mt-10 bg-teal-600 p-4 rounded-[50px] w-[50%] flex justify-center items-center">
        <Text className="text-white text-xl tracking-widest font-Outfitmd flex justify-center items-center">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
