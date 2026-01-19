import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNRestart from 'react-native-restart';

import { MyPageAPI } from '../api/myPageAPI';
import { GetAccountResponseDTO } from '../api/dto/myPage/response/getAccountResponseDTO';
import { TermsBottomSheet } from '../shared/components/TermsBottomSheet';
import { termsStorage } from '../storage/termsStorage';

export const HomeScreen = () => {
  const [account, setAccount] = useState<GetAccountResponseDTO | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    async function checkTermsAndFetchInfo() {
      // TODO: 테스트 후 아래 줄 삭제
      await termsStorage.clear();

      const hasAgreed = await termsStorage.hasAgreed();
      console.log('[HomeScreen] hasAgreed:', hasAgreed);
      if (!hasAgreed) {
        setShowTerms(true);
      }

      const data = await MyPageAPI.getAccount();
      setAccount(data);
    }

    checkTermsAndFetchInfo();
  }, []);

  const handleAgreeTerms = async () => {
    await termsStorage.setAgreed();
    setShowTerms(false);
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
