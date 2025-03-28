// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import {searchMovies} from '../api';
// import MovieCard from '../components/MovieCard';
// import SearchBar from '../components/SearchBar';

// const HomeScreen = ({navigation}) => {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (query.trim().length > 2) {
//         handleSearch();
//       } else {
//         setMovies([]);
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [query]);

//   const handleSearch = async (newPage = 1) => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const result = await searchMovies(query, newPage);
//       if (result && result.Search) {
//         setMovies(prev =>
//           newPage === 1 ? result.Search : [...prev, ...result.Search],
//         );
//         setPage(newPage);
//       } else {
//         setMovies([]);
//         setError(result?.Error || 'No movies found');
//       }
//     } catch (err) {
//       setError('Failed to fetch movies');
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMore = () => {
//     if (!loading && movies.length > 0) {
//       handleSearch(page + 1);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <SearchBar
//         value={query}
//         onChangeText={setQuery}
//         onSubmitEditing={() => handleSearch(1)}
//       />

//       {loading && page === 1 && (
//         <ActivityIndicator size="large" style={styles.loader} />
//       )}

//       {error ? (
//         <Text style={styles.error}>{error}</Text>
//       ) : (
//         <FlatList
//           data={movies}
//           keyExtractor={item => item.imdbID}
//           renderItem={({item}) => (
//             <MovieCard
//               movie={item}
//               onPress={() =>
//                 navigation.navigate('Details', {movieId: item.imdbID})
//               }
//             />
//           )}
//           ListEmptyComponent={
//             !loading &&
//             query.length > 2 && (
//               <Text style={styles.emptyText}>
//                 No results found for "{query}"
//               </Text>
//             )
//           }
//           onEndReached={loadMore}
//           onEndReachedThreshold={0.5}
//           ListFooterComponent={
//             loading && page > 1 ? (
//               <ActivityIndicator size="small" style={styles.footerLoader} />
//             ) : null
//           }
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   loader: {
//     marginTop: 20,
//   },
//   footerLoader: {
//     marginVertical: 20,
//   },
//   error: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: 'red',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#666',
//   },
// });

// export default HomeScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {searchMovies} from '../api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (query.trim().length > 2) {
      handleSearch(1); // Reset to page 1 when query changes
    } else {
      setMovies([]);
      setPage(1);
      setTotalResults(0);
    }
  }, [query]);

  const handleSearch = async (newPage = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await searchMovies(query, newPage);

      if (result && result.Search) {
        setMovies(prev =>
          newPage === 1 ? result.Search : [...prev, ...result.Search],
        );
        setPage(newPage);
        setTotalResults(parseInt(result.totalResults) || 0);
        setHasMore(newPage * 10 < parseInt(result.totalResults));
      } else {
        setMovies([]);
        setError(result?.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      handleSearch(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => handleSearch(1)}
      />

      {loading && page === 1 ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={movies}
            keyExtractor={item => item.imdbID}
            renderItem={({item}) => (
              <MovieCard
                movie={item}
                onPress={() =>
                  navigation.navigate('Details', {movieId: item.imdbID})
                }
              />
            )}
            ListEmptyComponent={
              !loading &&
              query.length > 2 && (
                <Text style={styles.emptyText}>
                  No results found for "{query}"
                </Text>
              )
            }
            ListFooterComponent={
              hasMore && (
                <View style={styles.loadMoreContainer}>
                  {loading ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <TouchableOpacity
                      style={styles.loadMoreButton}
                      onPress={handleLoadMore}>
                      <Text style={styles.loadMoreText}>Load More Movies</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )
            }
          />
          {totalResults > 0 && (
            <Text style={styles.resultCount}>
              Showing {movies.length} of {totalResults} results
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
  loadMoreContainer: {
    padding: 15,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultCount: {
    textAlign: 'center',
    padding: 10,
    color: '#666',
    fontSize: 14,
  },
});

export default HomeScreen;
