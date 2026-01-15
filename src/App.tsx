import React from 'react';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';
import { DeviceProvider } from './shared/contexts/DeviceContext';
import './shared/i18n';

function App() {
  const { initialRoute } = useAppBootstrap();

  if (!initialRoute) {
    return null;
  }

  return (
    <DeviceProvider>
      <RootNavigator initialRoute={initialRoute} />
    </DeviceProvider>
  );
}

export default App;
