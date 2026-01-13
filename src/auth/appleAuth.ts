import appleAuth from '@invertase/react-native-apple-authentication';

/**
 * 애플 로그인을 수행하고 identityToken을 반환합니다.
 * @returns 애플 identityToken
 * @throws 애플 로그인 실패 시 에러
 */
export const appleLogin = async (): Promise<string> => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const { identityToken } = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error('애플 identityToken 찾을 수 없습니다.');
      }

      console.log('[Auth] Apple login success', identityToken);
      return identityToken;
    }

    throw new Error('애플 인증이 승인되지 않았습니다.');
  } catch (e: any) {
    // 사용자가 취소한 경우
    if (e.code === appleAuth.Error.CANCELED) {
      console.log('[Auth] Apple login canceled by user');
      throw new Error('사용자가 애플 로그인을 취소했습니다.');
    }

    console.error('[Auth] Apple login error', e);
    throw e;
  }
};
