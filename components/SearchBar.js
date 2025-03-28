import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const SearchBar = ({value, onChangeText, onSubmitEditing}) => (
  <TextInput
    style={styles.input}
    placeholder="Search for movies..."
    placeholderTextColor="#999"
    value={value}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
    returnKeyType="search"
    clearButtonMode="while-editing"
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});

export default SearchBar;
