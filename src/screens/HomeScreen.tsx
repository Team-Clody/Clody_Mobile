import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNRestart from 'react-native-restart';

import { AuthAPI } from '../api/authAPI';
import { MyPageAPI } from '../api/myPageAPI';
import { GetAccountResponseDTO } from '../api/dto/myPage/response/getAccountResponseDTO';
import { TermsBottomSheet } from '../shared/components/TermsBottomSheet';
import { termsStorage } from '../storage/termsStorage';
import { tokenStorage } from '../storage/tokenStorage';

export const HomeScreen = () => {
  const [account, setAccount] = useState<GetAccountResponseDTO | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    async function checkTermsAndFetchInfo() {
      try {
        const accessToken = await tokenStorage.getAccessToken();
        console.log('='.repeat(50));
        console.log('[HomeScreen] 현재 사용 중인 Bearer Token:');
        console.log('Bearer', accessToken);
        console.log('='.repeat(50));

        const hasLocalAgreement = await termsStorage.hasLocalAgreement();

        if (!hasLocalAgreement) {
          console.log('[HomeScreen] 로컬에 약관 동의 정보가 없습니다. 바텀시트 표시');
          setShowTerms(true);
          return;
        }

        console.log('[HomeScreen] 로컬에 약관 동의 정보가 있습니다.');

        const data = await MyPageAPI.getAccount();
        setAccount(data);
      } catch (error) {
        console.error('[HomeScreen] 초기화 중 오류 발생:', error);
      }
    }

    checkTermsAndFetchInfo();
  }, []);

  const handleAgreeTerms = async () => {
    try {
      await AuthAPI.postAgreement({
        isServiceRuleAgreed: true,
        isPrivacyPolicyAgreed: true,
      });

      await termsStorage.setAllAgreed();
      setShowTerms(false);

      console.log('[HomeScreen] 약관 동의 완료');

      const data = await MyPageAPI.getAccount();
      setAccount(data);
    } catch (error) {
      console.error('[HomeScreen] 약관 동의 중 오류 발생:', error);
    }
  };

  const handleCloseTerms = () => {
    RNRestart.restart();
  };

  return (
    <SafeAreaProvider>
      <AppContent account={account} />
      <TermsBottomSheet
        visible={showTerms}
        onAgree={handleAgreeTerms}
        onClose={handleCloseTerms}
      />
    </SafeAreaProvider>
  );
};

function AppContent({ account }: { account: GetAccountResponseDTO | null }) {
  return (
    <View style={styles.container}>
      {account ? (
        <>
          <Text>Email: {account.email}</Text>
          <Text>Name: {account.name}</Text>
          <Text>Platform: {account.platform}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
});

export default HomeScreen;
