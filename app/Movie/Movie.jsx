import { useLocalSearchParams } from 'expo-router'; 
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import Similar from '../../components/Similar/Similar';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import { image500, movieCreditsEndpoint, movieDetailsEndpoint, similarMoviesEndpoint } from '../../Api/MovieDB';
import { useRouter } from 'expo-router'; 

const Movie = () => {
    const { height, width } = Dimensions.get('window');
    const [fav, setFav] = useState(false);
    const [cast, setCast] = useState({});
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [similar, setSimilar] = useState({})
    const router = useRouter();
    const params = useLocalSearchParams();  // Use useLocalSearchParams to get the movie ID

    const id = params.id;  // Get the movie ID from the URL parameters

    const handleBack = () => {
        router.back();
    };

    const handlePerson = (id) => {
        router.push({
            pathname: "Person/Person",
            params: { id }
        });
    };

    useEffect(() => {
        // Only fetch details if the ID exists
        if (id) {
            fetchMovieDetails(id);  // Pass the ID to fetchMovieDetails function
            fetchMovieCasts(id);
            fetchSimilarMovies(id);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } else {
            console.error("Movie ID is missing");
        }
    }, [id]);

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(movieDetailsEndpoint(movieId));  // Use the dynamic endpoint
            setDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMovieCasts = async (castId) => {
        try {
            const response = await axios.get(movieCreditsEndpoint(castId));
            setCast(response.data.cast)
            console.log(response.data.cast);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSimilarMovies = async (similarId) => {
        try {
            const response = await axios.get(similarMoviesEndpoint(similarId));
            setSimilar(response.data.results)
            console.log(response.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    if (!id) {
        return (
            <View className='flex justify-center items-center h-full'>
                <Text className='text-red-500'>Movie ID not found</Text>
            </View>
        );
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <ScrollView>
                    <View className="relative w-full -z-10">
                        <Image
                            source={{ uri: image500(details.poster_path) }}
                            className='w-full h-full rounded-bl-[60px] rounded-br-[60px]'
                            resizeMode='cover'
                            style={{
                                height: height * 0.55
                            }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{ width, height: height * 0.40 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className='absolute bottom-0 rounded-bl-[60px] rounded-br-[60px]'
                        />
                        <View className='absolute top-10 w-full flex flex-row items-center justify-between px-5'>
                            <TouchableOpacity onPress={handleBack} className='bg-teal-600 rounded p-1'>
                                <Feather name="arrow-left" size={28} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFav(!fav)}>
                                <MaterialCommunityIcons name="heart" size={40} color={fav ? "red" : "teal"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className='flex justify-center items-center px-5 mt-[-110px]'>
                        <Text className='text-4xl text-white font-Outfitbold text-center'>{details.original_title}</Text>
                        <Text className='text-gray-500 font-Outfitmd'>{`Released • ${details.release_date} • ${details.runtime}min`}</Text>
                        <Text className='text-gray-500 font-Outfitmd mt-[20px]'>{details.genres?.map(genre => genre.name).join(' • ')}</Text>
                        <Text className='text-gray-500 text-justify mt-3'>{details.overview}</Text>
                    </View>

                    <View className='px-5 mt-[20px]'>
                        <Text className='font-Outfitbold text-xl capitalize'>Top casts</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='mt-2'>
                            {cast.map((c, index) => (
                                <TouchableWithoutFeedback onPress={() => handlePerson(c.id)} key={index}>
                                    <View className='flex flex-col justify-center items-center space-x-3'>
                                        <View className='rounded-full border-gray-500 border-[1px] w-[80px] h-[80px] mb-1'>
                                            <Image
                                                source={{ uri: image500(c.profile_path) }}
                                                className='rounded-full w-full h-full'
                                            />
                                        </View>
                                        <Text className='text-gray-400 font-Outfit'>{c.character}</Text>
                                        <Text className='text-gray-500 font-Outfitmd'>
                                            {c.name.length > 10 ? `${c.name.slice(0, 10)}...` : c.original_name}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </ScrollView>
                    </View>

                    <View className='mt-[20px]'>
                        <Similar similar={similar} />
                    </View>
                </ScrollView>
            )}
        </>
    );
};

export default Movie;
