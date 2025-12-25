import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MyPageAPI } from './api/myPageAPI';
import { GetAccountResponseDTO } from './api/dto/getAccountResponseDTO';

function App() {
  const [account, setAccount] = useState<GetAccountResponseDTO | null>(null);
  useEffect(() => {
    async function fetchInfo() {
      const data = await MyPageAPI.fetchInfo();
      setAccount(data);
    }

    fetchInfo();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContent account={account} />
    </SafeAreaProvider>
  );
}
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

export default App;
