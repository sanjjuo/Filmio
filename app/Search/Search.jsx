import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import { searchMoviesEndpoint } from '../../Api/MovieDB'; // Import search API endpoint

const Search = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchText.length > 1) {
            setLoading(true);
            const timer = setTimeout(() => {
                searchMovies(); // Trigger the search after a delay
            }, 300); // Debounce time of 300ms

            return () => clearTimeout(timer); // Clear timeout if input changes
        }
    }, [searchText]);

    const searchMovies = async () => {
        try {
            const response = await axios.get(`${searchMoviesEndpoint}&query=${searchText}&include_adult=true`);
            setSearchResults(response.data.results); // Store the search results
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleBack = () => {
        router.back();
    };

    const handleClear = () => {
        setSearchText(''); // Clear the input and reset the results
        setSearchResults([]);
    };

    const handleMovie = (id) => {
        router.push({
            pathname: "Movie/Movie",
            params: { id }
        });
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {/* Search Input */}
            <View className='flex flex-row items-center border border-gray-400 mx-4 rounded-3xl px-4 mt-10'>
                <TouchableOpacity onPress={handleBack}>
                    <Feather name="arrow-left" size={28} color="teal" />
                </TouchableOpacity>
                <TextInput
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)} // Set the searchText on input change
                    placeholder='Search Movies'
                    placeholderTextColor="gray"
                    className='flex-1 font-Outfit tracking-wider text-sm'
                    style={{ padding: 10 }}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={handleClear}>
                        <FontAwesome6 name="xmark" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Loading Indicator */}
            {loading && <Loading />}

            {/* Search Results */}
            {!loading && searchResults.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} className='px-5 space-y-3 pt-3'>
                    <Text className='font-Outfit'>Results ({searchResults.length})</Text>
                    <View className='flex flex-row flex-wrap justify-between'>
                        {searchResults.map((movie) => (
                            <TouchableOpacity
                                key={movie.id}
                                onPress={() => handleMovie(movie.id)}
                                className='w-[48%] h-[180px] mb-8'
                            >
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                    className='w-full h-full object-contain rounded-2xl'
                                />
                                <Text className='font-Outfitmd text-center text-sm'>{movie.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className='flex justify-center items-center w-full h-[300px] mt-10'>
                    <Image source={require("../../assets/images/search.png")} className=' w-full h-full object-contain' />
                </View>
            )}

            {/* No Results or Prompt */}
            {!loading && searchText.length > 1 && searchResults.length === 0 && (
                <View className='flex items-center justify-center mt-10'>
                    <Text className='font-Outfit text-gray-500'>No results found for "{searchText}"</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Search;
