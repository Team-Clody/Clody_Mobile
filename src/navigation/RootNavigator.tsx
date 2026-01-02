import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { Routes, StackNavParamList } from './route';

const Stack = createStackNavigator<StackNavParamList>();

export function RootNavigator({
  initialRoute,
}: {
  initialRoute: keyof StackNavParamList;
}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
