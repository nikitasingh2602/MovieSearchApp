import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const MovieCard = ({movie, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
      source={{
        uri:
          movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://via.placeholder.com/300x450?text=No+Poster',
      }}
      style={styles.poster}
      resizeMode="cover"
    />
    <View style={styles.infoContainer}>
      <Text style={styles.title} numberOfLines={1}>
        {movie.Title}
      </Text>
      <Text style={styles.year}>{movie.Year}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  year: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
});

export default MovieCard;
