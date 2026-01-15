import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarScreen;
