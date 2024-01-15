import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from "./screen/ProductScreen";
import CartScreen from './screen/CartScreen';
import store from './redux/store';
import { Provider } from 'react-redux';

import FavouriteScreen from "./screen/FavouriteScreen"

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductScreen} />
        <Stack.Screen name="CartItems" component={CartScreen} />
        <Stack.Screen name="FavouiriteItems" component={FavouriteScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>

  );
};

export default App;
