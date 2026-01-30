import {
  getRemoteConfig,
  setConfigSettings,
  fetchAndActivate,
} from '@react-native-firebase/remote-config';

/**
 * 앱 시작 시 Firebase Remote Config 초기화
 */
export async function initializeRemoteConfig(): Promise<void> {
  console.log('🔧 Remote Config 초기화 시작');

  const config = getRemoteConfig();

  // Remote Config 설정
  await setConfigSettings(config, {
    minimumFetchIntervalMillis: 0, // 개발 중에는 0으로 설정 (항상 최신 값 가져오기)
  });

  try {
    await fetchAndActivate(config);
    console.log('✅ Remote Config 초기화 완료');
  } catch (error) {
    console.error('❌ Remote Config 초기화 실패:', error);
    throw error;
  }
}
