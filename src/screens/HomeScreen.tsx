import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { APIKit, ApiResponse } from '../shared/http';

interface GetAccountResponseDTO {
  email: string;
  name: string;
  platform: string;
}

export const HomeScreen = () => {
  const [account, setAccount] = useState<GetAccountResponseDTO | null>(null);

  useEffect(() => {
    async function fetchInfo() {
      const resp = await APIKit.get<ApiResponse<GetAccountResponseDTO>>(
        '/user/info',
      );
      setAccount(resp.data.data);
    }

    fetchInfo();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContent account={account} />
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
  },
});

export default HomeScreen;
