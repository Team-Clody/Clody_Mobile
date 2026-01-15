import { useEffect, useState } from 'react';
import { Routes, StackNavParamList } from './navigation/route';
import RNBootSplash from 'react-native-bootsplash';
import {
  checkAppVersion,
  checkAutoLogin,
  checkInspection,
} from './appBootstrapService';

export function useAppBootstrap() {
  const [initialRoute, setInitialRoute] = useState<
    keyof StackNavParamList | null
  >(null);

  useEffect(() => {
    bootstrap();
  }, []);

  async function bootstrap() {
    try {
      await checkAppVersion();
      await checkInspection();
      const autoLoginSuccess = await checkAutoLogin();
      setInitialRoute(autoLoginSuccess ? Routes.MAIN_TAB : Routes.LOGIN);
    } catch (e) {
      console.log(e);
      setInitialRoute(Routes.LOGIN);
    } finally {
      RNBootSplash.hide({ fade: true });
    }
  }

  return { initialRoute };
}
