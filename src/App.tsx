import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';
import { DeviceProvider } from './shared/contexts/DeviceContext';

function App() {
  const { initialRoute } = useAppBootstrap();

  if (!initialRoute) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <DeviceProvider>
        <RootNavigator initialRoute={initialRoute} />
      </DeviceProvider>
    </SafeAreaProvider>
  );
}

export default App;
