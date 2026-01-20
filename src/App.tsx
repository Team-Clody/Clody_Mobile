import React from 'react';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';
import { DeviceProvider } from './shared/contexts/DeviceContext';
import { ModalProvider } from './shared/contexts/ModalContext';
import { ModalContainer } from './shared/components/modal/ModalContainer';
import './shared/i18n';

function App() {
  const { initialRoute } = useAppBootstrap();

  if (!initialRoute) {
    return null;
  }

  return (
    <DeviceProvider>
      <ModalProvider>
        <RootNavigator initialRoute={initialRoute} />
        <ModalContainer />
      </ModalProvider>
    </DeviceProvider>
  );
}

export default App;
