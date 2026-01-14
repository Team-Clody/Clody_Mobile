import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { Routes, StackNavParamList } from './route';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator<StackNavParamList>();

export function RootNavigator({
  initialRoute,
}: {
  initialRoute: keyof StackNavParamList;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name={Routes.LOGIN}
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.MAIN_TAB}
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
