import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const TopBar = () => {
    const router = useRouter()
    const handleSearch = () => {
        router.push("Search/Search")
    }
    return (
        <SafeAreaView className='bg-white'>
            {/* Customizing the StatusBar */}
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent={true}
            />

            {/* TopBar Content */}
            <View className='flex flex-row justify-between items-center px-5 pt-2 h-20'>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="menu" size={28} color="teal" />
                </TouchableOpacity>

                <View className='flex flex-col items-center'>
                    {/* <MaterialCommunityIcons name="movie-open" size={28} color="teal" /> */}
                    <Text className='font-Outfitbold text-teal-600 text-5xl'>
                        <Text className='text-gray-500'>F</Text>ilmio
                    </Text>
                </View>

                <TouchableOpacity onPress={handleSearch}>
                    <AntDesign name="search1" size={28} color="teal" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TopBar;
