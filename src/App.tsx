import React from 'react';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';
import { DeviceProvider } from './shared/contexts/DeviceContext';
import { SignupProvider } from './shared/contexts/SignupContext';
import './shared/i18n';

function App() {
  const { initialRoute } = useAppBootstrap();

  if (!initialRoute) {
    return null;
  }

  return (
    <DeviceProvider>
      <SignupProvider>
        <RootNavigator initialRoute={initialRoute} />
      </SignupProvider>
    </DeviceProvider>
  );
}

export default App;
