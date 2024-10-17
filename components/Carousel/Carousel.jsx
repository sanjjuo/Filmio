import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRouter } from "expo-router"
import axios from 'axios';
import { image500, trendingMovieEndPoint } from '../../Api/MovieDB';

const AppCarousel = () => {
    const { width, height } = Dimensions.get('window');
    const router = useRouter();
    const [trending, setTrending] = useState([])

    const handleClick = (id) => {
        router.push({
            pathname: "/Movie/Movie",
            params: { id }
        });
    };
    

    useEffect(() => {
        const fetchTrendingMovie = async () => {
            const response = await axios.get(trendingMovieEndPoint);
            setTrending(response.data.results);
            console.log(response.data.results);
        }
        fetchTrendingMovie()
    }, [])

    return (
        <View className='py-[10px]'>
            <Text className='px-5 font-Outfitmd text-lg'>Trending</Text>
            <Carousel
                loop
                width={width}
                height={height / 2}
                autoPlay={true}
                mode='parallax'
                data={trending}
                autoPlayInterval={5000}
                scrollAnimationDuration={1000}
                pagingEnabled={true}
                renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback onPress={() => handleClick(item.id)} key={index} className='w-full h-[450px] rounded-2xl'>
                        <Image
                            source={{ uri: image500(item.poster_path) }}
                            className='w-full h-full object-contain rounded-2xl'
                        />
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );
};

export default AppCarousel;
