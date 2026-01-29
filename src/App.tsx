import React from 'react';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';
import { DeviceProvider } from './shared/contexts/DeviceContext';
import { ModalProvider } from './shared/contexts/ModalContext';
import { ToastProvider } from './shared/contexts/ToastContext';
import { ModalContainer } from './shared/components/modal/ModalContainer';
import './shared/i18n';

function App() {
  const { initialRoute, isInspectionTime } = useAppBootstrap();

  // 점검 시간이면 모달만 표시
  if (isInspectionTime) {
    return (
      <DeviceProvider>
        <ModalProvider initialModal="inspection">
          <ModalContainer />
        </ModalProvider>
      </DeviceProvider>
    );
  }

  if (!initialRoute) {
    return null;
  }

  return (
    <DeviceProvider>
      <ModalProvider>
        <ToastProvider>
          <RootNavigator initialRoute={initialRoute} />
          <ModalContainer />
        </ToastProvider>
      </ModalProvider>
    </DeviceProvider>
  );
}

export default App;
