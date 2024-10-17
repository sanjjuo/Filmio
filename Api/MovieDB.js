import { apiKey } from "../constants/Data";

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
export const trendingMovieEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
export const upcomingMovieEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
export const topRatedMovieEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

// movie details dynamic endpoints
export const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
export const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
export const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`

// person endpoints
export const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
export const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

// search endpoint
export const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

export const image500 = path => path ?  `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ?  `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ?  `https://image.tmdb.org/t/p/w185${path}` : null;