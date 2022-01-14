import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/stores/rootReducer';

import Tabs from './src/navigation/tabs';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="MainLayout">
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
