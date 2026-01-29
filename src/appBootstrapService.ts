import {
  getRemoteConfig,
  getValue,
} from '@react-native-firebase/remote-config';

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

export async function checkAppVersion(): Promise<void> {
  console.log('📦 앱 버전 검사 시작');
  await delay(100);
  console.log('✅ 앱 버전 검사 완료');
}

export async function checkInspection(): Promise<boolean> {
  console.log('🛠 점검 시간 검사 시작');

  try {
    const config = getRemoteConfig();

    const inspectionStart = getValue(config, 'rn_inspection_start').asString();
    const inspectionEnd = getValue(config, 'rn_inspection_end').asString();

    console.log('📋 rn_inspection_start:', inspectionStart);
    console.log('📋 rn_inspection_end:', inspectionEnd);

    const isInspectionTime = checkIfInspectionTime(
      inspectionStart,
      inspectionEnd,
    );

    if (isInspectionTime) {
      console.log('⚠️ 점검 시간입니다');
    } else {
      console.log('✅ 점검 시간 아님');
    }

    return isInspectionTime;
  } catch (error) {
    console.error('❌ 점검 시간 검사 중 오류:', error);
    console.log('✅ 점검 시간 아님 (오류로 인해 기본값)');
    return false;
  }
}

function checkIfInspectionTime(start: string, end: string): boolean {
  if (!start || !end || start.trim() === '' || end.trim() === '') {
    return false;
  }

  try {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    // 유효한 날짜인지 확인
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.warn('⚠️ 날짜 형식이 올바르지 않습니다');
      return false;
    }

    // 현재 시간이 점검 시작 시간과 종료 시간 사이에 있는지 확인
    return now >= startDate && now <= endDate;
  } catch (error) {
    console.error('❌ 점검 시간 체크 중 오류:', error);
    return false;
  }
}

export async function checkAutoLogin(): Promise<boolean> {
  console.log('🔐 자동 로그인 판별 시작');
  await delay(100);

  // 지금은 무조건 성공 / 실패 중 하나로 고정
  const success = false; // ← false로 바꾸면 LoginScreen으로 이동
  console.log(success ? '✅ 자동 로그인 성공' : '❌ 자동 로그인 실패');

  return success;
}
