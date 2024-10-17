import { View, Text, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { image500 } from '../../Api/MovieDB';
import { useRouter } from "expo-router";

const PersonMovies = ({ pmovies }) => {
    const router = useRouter();
    
    const handleClick = (id) => {
        router.push({
            pathname: "/Movie/Movie",
            params: { id }
        });
    };

    return (
        <View className='py-[10px]'>
            <View className="flex flex-row justify-between items-center">
                <Text className='font-Outfitmd text-lg'>Movies</Text>
                <TouchableOpacity>
                    <Text className='font-Outfitmd text-sm text-teal-600'>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-5">
                <View className="flex flex-row space-x-3">
                    {pmovies.map((item, index) => (
                        <TouchableWithoutFeedback onPress={() => handleClick(item.id)} key={index}>
                            <View className="w-[100px] h-[150px] mx-1">
                                <Image
                                    source={{ uri: image500(item.poster_path) }}
                                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                    resizeMode="contain" 
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default PersonMovies;
