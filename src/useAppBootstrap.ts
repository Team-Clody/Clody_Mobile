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
      // 로그인 로직 임시 주석 처리
      // await checkAppVersion();
      // await checkInspection();
      // const autoLoginSuccess = await checkAutoLogin();
      // setInitialRoute(autoLoginSuccess ? Routes.HOME : Routes.LOGIN);

      setInitialRoute(Routes.LOGIN);
    } catch (e) {
      console.log(e);
      setInitialRoute(Routes.LOGIN);
    } finally {
      RNBootSplash.hide({ fade: true });
    }
  }

  return { initialRoute };
}
