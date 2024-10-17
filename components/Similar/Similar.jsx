import { View, Text, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { image500 } from '../../Api/MovieDB';
import { useRouter } from "expo-router";

const Similar = ({ similar }) => {
    const router = useRouter();

    const handleClick = (id) => {
        router.push({
            pathname: "/Movie/Movie",
            params: { id }
        });
    };
    return (
        <View className='py-[10px] px-5'>
            <View className="flex flex-row justify-between items-center">
                <Text className='font-Outfitmd text-lg'>Similar Movies</Text>
                <TouchableOpacity>
                    <Text className='font-Outfitmd text-sm text-teal-600'>See All</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap justify-between gap-1 mt-5">
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className="flex flex-row space-x-3">
                        {
                            similar.map((item, index) => (
                                <TouchableWithoutFeedback onPress={() => handleClick(item.id)} key={index}>
                                    <View className="w-[100px] h-[150px] mx-1">
                                        <Image source={{ uri: image500(item.poster_path) }} className="w-full h-full object-contain rounded-xl" />
                                    </View>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Similar