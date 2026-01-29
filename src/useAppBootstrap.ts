import { useEffect, useState } from 'react';
import { Routes, StackNavParamList } from './navigation/route';
import RNBootSplash from 'react-native-bootsplash';
import {
  checkAppVersion,
  checkAutoLogin,
  checkInspection,
} from './appBootstrapService';
import { initializeRemoteConfig } from './shared/utils';

export function useAppBootstrap() {
  const [initialRoute, setInitialRoute] = useState<
    keyof StackNavParamList | null
  >(null);
  const [isInspectionTime, setIsInspectionTime] = useState<boolean>(false);

  useEffect(() => {
    bootstrap();
  }, []);

  async function bootstrap() {
    try {
      await initializeRemoteConfig();
      await checkAppVersion();

      const inspectionResult = await checkInspection();
      setIsInspectionTime(inspectionResult);

      if (inspectionResult) {
        return;
      }

      const autoLoginSuccess = await checkAutoLogin();
      setInitialRoute(autoLoginSuccess ? Routes.MAIN_TAB : Routes.LOGIN);
    } catch (e) {
      console.log(e);
      setInitialRoute(Routes.LOGIN);
    } finally {
      RNBootSplash.hide({ fade: true });
    }
  }

  return { initialRoute, isInspectionTime };
}
