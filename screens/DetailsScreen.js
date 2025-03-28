// import React, {useEffect, useState} from 'react';
// import {View, Text, Image, Button, StyleSheet} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getMovieDetails} from '../api';

// const DetailsScreen = ({route}) => {
//   const {movieId} = route.params;
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     getMovieDetails(movieId).then(setMovie);
//   }, []);

//   const saveToFavorites = async () => {
//     const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
//     const updatedFavorites = [...favorites, movie];
//     await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   if (!movie) return <Text>Loading...</Text>;

//   return (
//     <View style={styles.container}>
//       <Image source={{uri: movie.Poster}} style={styles.poster} />
//       <Text style={styles.title}>{movie.Title}</Text>
//       <Text>Year: {movie.Year}</Text>
//       <Text>Genre: {movie.Genre}</Text>
//       <Text>Rating: {movie.imdbRating}</Text>
//       <Button title="Add to Favorites" onPress={saveToFavorites} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {padding: 20},
//   poster: {width: '100%', height: 300, borderRadius: 10},
//   title: {fontSize: 24, fontWeight: 'bold', marginVertical: 10},
// });

// export default DetailsScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMovieDetails} from '../api';

const DetailsScreen = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);

      // Check if movie is already in favorites
      const favorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.some(fav => fav.imdbID === movieId));
    };

    fetchData();
  }, [movieId]);

  const toggleFavorite = async () => {
    try {
      const favorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];

      if (isFavorite) {
        // Remove from favorites
        const updatedFavorites = favorites.filter(
          fav => fav.imdbID !== movie.imdbID,
        );
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(updatedFavorites),
        );
        setIsFavorite(false);
        Alert.alert('Removed from Favorites');
      } else {
        // Add to favorites
        const updatedFavorites = [...favorites, movie];
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(updatedFavorites),
        );
        setIsFavorite(true);
        Alert.alert('Added to Favorites');
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/300x450?text=No+Poster',
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.detail}>Year: {movie.Year}</Text>
      <Text style={styles.detail}>Genre: {movie.Genre}</Text>
      <Text style={styles.detail}>Rating: {movie.imdbRating}</Text>
      <Text style={styles.detail}>Plot: {movie.Plot}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={toggleFavorite}
          color={isFavorite ? '#FF3B30' : '#007AFF'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default DetailsScreen;
