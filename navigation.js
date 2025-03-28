// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
// import HomeScreen from './screens/HomeScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import FavoritesScreen from './screens/FavoritesScreen';

// const Stack = createNativeStackNavigator();

// const Navigation = () => (
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//       <Stack.Screen name="Favorites" component={FavoritesScreen} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

// export default Navigation;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity, Text} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favorites')}
              style={{marginRight: 15}}>
              <Text style={{color: '#007AFF', fontSize: 16}}>Favorites</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
