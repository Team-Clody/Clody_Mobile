import { useEffect, useState, useCallback } from 'react';
import { Routes, StackNavParamList } from './navigation/route';
import RNBootSplash from 'react-native-bootsplash';
import {
  AppVersionCheckResult,
  checkAppVersion,
  checkAutoLogin,
  checkInspection,
  InspectionCheckResult,
} from './appBootstrapService';
import { initializeRemoteConfig } from './shared/utils';

export function useAppBootstrap() {
  const [initialRoute, setInitialRoute] = useState<
    keyof StackNavParamList | null
  >(null);
  const [appVersionResult, setAppVersionResult] =
    useState<AppVersionCheckResult | null>(null);
  const [inspectionResult, setInspectionResult] =
    useState<InspectionCheckResult | null>(null);

  const bootstrap = useCallback(async () => {
    try {
      await initializeRemoteConfig();

      // 1. 앱 버전 판별
      const versionResult = await checkAppVersion();
      setAppVersionResult(versionResult);

      if (
        versionResult.status === 'hardUpdate' ||
        versionResult.status === 'softUpdate'
      ) {
        return;
      }

      // 2. 점검 여부 판별
      const inspectionCheckResult = await checkInspection();
      setInspectionResult(inspectionCheckResult);

      if (inspectionCheckResult.isInspectionTime) {
        return;
      }

      // 3. 자동 로그인 판별
      const autoLoginSuccess = await checkAutoLogin();
      setInitialRoute(autoLoginSuccess ? Routes.MAIN_TAB : Routes.LOGIN);
    } catch (e) {
      console.log(e);
      setInitialRoute(Routes.LOGIN);
    } finally {
      RNBootSplash.hide({ fade: true });
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return {
    initialRoute,
    isInspectionTime: inspectionResult?.isInspectionTime ?? false,
    inspectionResult,
    appVersionResult,
  };
}
