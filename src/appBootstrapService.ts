const delay = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

export async function checkAppVersion(): Promise<void> {
  console.log('📦 앱 버전 검사 시작');
  await delay(100);
  console.log('✅ 앱 버전 검사 완료');
}

export async function checkInspection(): Promise<void> {
  console.log('🛠 점검 시간 검사 시작');
  await delay(100);
  console.log('✅ 점검 시간 아님');
}

export async function checkAutoLogin(): Promise<boolean> {
  console.log('🔐 자동 로그인 판별 시작');
  await delay(100);

  // 지금은 무조건 성공 / 실패 중 하나로 고정
  const success = false; // ← false로 바꾸면 LoginScreen으로 이동
  console.log(success ? '✅ 자동 로그인 성공' : '❌ 자동 로그인 실패');

  return success;
}
