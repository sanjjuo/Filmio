import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import PersonMovies from '../../components/PersonMovies/PersonMovies';
import Loading from '../../components/Loading/Loading';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { image500, personDetailsEndpoint, personMoviesEndpoint } from '../../Api/MovieDB';

const Person = () => {
    const [fav, setFav] = useState(false)
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState({});
    const [pmovies, setPMovies] = useState([])
    const router = useRouter()
    const params = useLocalSearchParams();
    const id = params.id;

    const handleBack = () => {
        router.back()
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        fetchCastDetails(id)
        fetchPersonMovies(id)
    }, [])

    const fetchCastDetails = async (personId) => {
        try {
            const response = await axios.get(personDetailsEndpoint(personId));
            setPerson(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error); 
        }
    }

    const fetchPersonMovies = async (pMovieId) => {
        try {
            const response = await axios.get(personMoviesEndpoint(pMovieId));
            setPMovies(response.data.cast)
            console.log(response.data.cast);
        } catch (error) {
            console.log(error);           
        }
    }

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView>
                        <View className='py-10 w-full flex flex-row items-center justify-between px-5'>
                            <TouchableOpacity onPress={handleBack} className='bg-teal-600 rounded p-1'>
                                <Feather name="arrow-left" size={28} color="white" />
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => setFav(!fav)}>
                                <MaterialCommunityIcons name="heart" size={40} color={fav ? "red" : "teal"} />
                            </TouchableOpacity>
                        </View >

                        <View className='px-5'>
                            <View className='flex justify-center items-center'>
                                <View className='rounded-full w-[300px] h-[300px] border-2 border-gray-300 mb-3'>
                                    <Image source={{uri: image500(person.profile_path)}} className='w-full h-full object-contain rounded-full' />
                                </View>
                                <Text className='font-Outfitbold text-4xl'>{person.name}</Text>
                                <Text>{person.place_of_birth}</Text>
                                <View className='bg-gray-200 flex flex-row items-center gap-1 mt-5 rounded-3xl p-2'>
                                    <View className='border-r-[1px] px-2 flex justify-center items-center'>
                                        <Text className='font-Outfitmd text-gray-700'>Gender</Text>
                                        <Text className='font-Outfit text-gray-500'>{person?.gender === 1 ? 'Female' : 'Male'}</Text>
                                    </View>
                                    <View className='border-r-[1px] px-2 flex justify-center items-center'>
                                        <Text className='font-Outfitmd text-gray-700'>DOB</Text>
                                        <Text className='font-Outfit text-gray-500'>{person.birthday}</Text>
                                    </View>
                                    <View className='border-r-[1px] px-2 flex justify-center items-center'>
                                        <Text className='font-Outfitmd text-gray-700'>Known for</Text>
                                        <Text className='font-Outfit text-gray-500'>{person.known_for_department}</Text>
                                    </View>
                                    <View className='px-2 flex justify-center items-center'>
                                        <Text className='font-Outfitmd text-gray-700'>Popularity</Text>
                                        <Text className='font-Outfit text-gray-500'>{person.popularity}</Text>
                                    </View>
                                </View>
                            </View>

                            <View className='mt-3'>
                                <Text className='font-Outfitmd text-lg'>Biography</Text>
                                <Text className='text-gray-500 text-justify mt-3'>
                                    {person.biography}
                                </Text>
                            </View>

                            <View>
                                <PersonMovies pmovies={pmovies}/>
                            </View>
                        </View>

                    </ScrollView >
                )
            }
        </>

    )
}

export default Person