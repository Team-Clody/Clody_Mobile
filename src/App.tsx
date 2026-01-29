import React from 'react';
import { useAppBootstrap } from './useAppBootstrap';
import { RootNavigator } from './navigation/RootNavigator';
import { DeviceProvider } from './shared/contexts/DeviceContext';
import { ModalProvider } from './shared/contexts/ModalContext';
import { ToastProvider } from './shared/contexts/ToastContext';
import { ModalContainer } from './shared/components/modal/ModalContainer';
import './shared/i18n';

function App() {
  const { initialRoute, appVersionResult, isInspectionTime } =
    useAppBootstrap();

  // 버전 업데이트가 필요한 경우 모달만 표시 (우선순위 1)
  if (
    appVersionResult &&
    (appVersionResult.status === 'hardUpdate' ||
      appVersionResult.status === 'softUpdate')
  ) {
    const latestVersion =
      appVersionResult.status === 'hardUpdate'
        ? appVersionResult.hardUpdateVersion
        : appVersionResult.softUpdateVersion;

    return (
      <DeviceProvider>
        <ModalProvider
          initialModal={appVersionResult.status}
          initialModalData={{
            currentVersion: appVersionResult.currentVersion,
            latestVersion,
          }}
        >
          <ModalContainer />
        </ModalProvider>
      </DeviceProvider>
    );
  }

  // 점검 시간이면 모달만 표시 (우선순위 2)
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
