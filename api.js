import axios from 'axios';

const API_KEY = '6f251f7c'; // Replace with your actual API key
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
        query,
      )}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getMovieDetails = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`,
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
