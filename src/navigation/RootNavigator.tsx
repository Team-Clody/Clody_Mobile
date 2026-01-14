import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { Routes, StackNavParamList } from './route';
import { StyleSheet } from 'react-native';
import { NicknameScreen } from '../screens/onboarding/NicknameScreen';
import { BirthdayScreen } from '../screens/onboarding/BirthdayScreen';

const Stack = createStackNavigator<StackNavParamList>();

export function RootNavigator({
  initialRoute,
}: {
  initialRoute: keyof StackNavParamList;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name={Routes.LOGIN}
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={Routes.HOME} component={HomeScreen} />
            <Stack.Screen
              name={Routes.ONBOARDING_NICKNAME}
              component={NicknameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.ONBOARDING_BIRTHDAY}
              component={BirthdayScreen}
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
