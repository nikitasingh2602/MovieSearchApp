// import React, {useEffect, useState} from 'react';
// import {View, FlatList, Text} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MovieCard from '../components/MovieCard';

// const FavoritesScreen = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const storedFavorites = await AsyncStorage.getItem('favorites');
//       setFavorites(JSON.parse(storedFavorites) || []);
//     };
//     fetchFavorites();
//   }, []);

//   return (
//     <FlatList
//       data={favorites}
//       keyExtractor={item => item.imdbID}
//       renderItem={({item}) => <MovieCard movie={item} />}
//     />
//   );
// };

// export default FavoritesScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavorites();
    });

    fetchFavorites();
    return unsubscribe;
  }, [navigation]);

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(JSON.parse(storedFavorites) || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async imdbID => {
    try {
      const updatedFavorites = favorites.filter(
        movie => movie.imdbID !== imdbID,
      );
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubText}>
          Add movies to favorites from their details page
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.imdbID}
      contentContainerStyle={styles.listContainer}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.movieItem}
          onPress={() =>
            navigation.navigate('Details', {movieId: item.imdbID})
          }>
          <Image
            source={{
              uri:
                item.Poster !== 'N/A'
                  ? item.Poster
                  : 'https://via.placeholder.com/100x150?text=No+Poster',
            }}
            style={styles.poster}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{item.Title}</Text>
            <Text style={styles.movieYear}>{item.Year}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.imdbID)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  poster: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 10,
  },
  movieTitle: {
    fontWeight: 'bold',
  },
  movieYear: {
    color: '#666',
    fontSize: 12,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#FF3B30',
  },
});

export default FavoritesScreen;
