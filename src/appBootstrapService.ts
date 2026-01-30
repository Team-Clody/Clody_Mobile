import {
  getRemoteConfig,
  getValue,
} from '@react-native-firebase/remote-config';
import { tokenStorage } from './storage/tokenStorage';
import { version } from '../package.json';

/**
 * 앱 버전 상태 타입
 */
export type AppVersionStatus = 'hardUpdate' | 'softUpdate' | 'latest';

/**
 * 앱 버전 검사 결과
 */
export interface AppVersionCheckResult {
  status: AppVersionStatus;
  currentVersion: string;
  softUpdateVersion: string;
  hardUpdateVersion: string;
}

/**
 * 버전 문자열을 숫자 배열로 변환하여 비교
 * @param version1 첫 번째 버전 (예: "2.0.0")
 * @param version2 두 번째 버전 (예: "2.1.0")
 * @returns version1 < version2면 -1, 같으면 0, version1 > version2면 1
 */
function compareVersions(version1: string, version2: string): number {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);

  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;

    if (v1Part < v2Part) {
      return -1;
    }
    if (v1Part > v2Part) {
      return 1;
    }
  }

  return 0;
}

/**
 * 앱 버전을 검사하여 업데이트 필요 여부를 확인
 * @returns 앱 버전 검사 결과
 */
export async function checkAppVersion(): Promise<AppVersionCheckResult> {
  console.log('📦 앱 버전 검사 시작');

  try {
    const config = getRemoteConfig();
    const currentVersion = version;

    const softUpdateVersion = getValue(
      config,
      'rn_update_version_soft',
    ).asString();
    const hardUpdateVersion = getValue(
      config,
      'rn_update_version_hard',
    ).asString();

    console.log('📋 현재 버전:', currentVersion);
    console.log('📋 소프트 업데이트 버전:', softUpdateVersion);
    console.log('📋 하드 업데이트 버전:', hardUpdateVersion);

    if (!softUpdateVersion || !hardUpdateVersion) {
      console.warn('⚠️ Remote Config에서 버전 정보를 가져올 수 없습니다');
      return {
        status: 'latest',
        currentVersion,
        softUpdateVersion: softUpdateVersion || '',
        hardUpdateVersion: hardUpdateVersion || '',
      };
    }

    const compareWithHard = compareVersions(currentVersion, hardUpdateVersion);
    const compareWithSoft = compareVersions(currentVersion, softUpdateVersion);

    const status: AppVersionStatus =
      compareWithHard < 0
        ? 'hardUpdate'
        : compareWithSoft < 0
        ? 'softUpdate'
        : 'latest';

    console.log(
      status === 'hardUpdate'
        ? '⚠️ 하드 업데이트 필요'
        : status === 'softUpdate'
        ? '⚠️ 소프트 업데이트 권장'
        : '✅ 최신 버전입니다',
    );

    return {
      status,
      currentVersion,
      softUpdateVersion,
      hardUpdateVersion,
    };
  } catch (error) {
    console.error('❌ 앱 버전 검사 중 오류:', error);
    return {
      status: 'latest',
      currentVersion: version,
      softUpdateVersion: '',
      hardUpdateVersion: '',
    };
  }
}

/**
 * 점검 시간 검사 결과
 */
export interface InspectionCheckResult {
  isInspectionTime: boolean;
  inspectionStart: string;
  inspectionEnd: string;
}

export async function checkInspection(): Promise<InspectionCheckResult> {
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

    return {
      isInspectionTime,
      inspectionStart: inspectionStart || '',
      inspectionEnd: inspectionEnd || '',
    };
  } catch (error) {
    console.error('❌ 점검 시간 검사 중 오류:', error);
    return {
      isInspectionTime: false,
      inspectionStart: '',
      inspectionEnd: '',
    };
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

  try {
    const tokens = await tokenStorage.getTokens();

    if (tokens && tokens.accessToken && tokens.refreshToken) {
      console.log('✅ 자동 로그인 성공 - 토큰이 존재합니다');
      return true;
    } else {
      console.log('❌ 자동 로그인 실패 - 토큰이 없습니다');
      return false;
    }
  } catch (error) {
    console.error('❌ 자동 로그인 판별 중 오류:', error);
    return false;
  }
}
