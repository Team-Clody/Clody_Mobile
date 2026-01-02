import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';

function App() {
  const { initialRoute } = useAppBootstrap();

  if (!initialRoute) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <RootNavigator initialRoute={initialRoute} />
    </SafeAreaProvider>
  );
}

export default App;
