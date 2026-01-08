import { Pressable, StyleSheet, View } from 'react-native';
import { Typo } from '../../shared/components';

const HeaderSection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell />
      <MyPageCell />
    </View>
  );
};

const BodySection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell />
      <MyPageCell />
      <MyPageCell />
      <MyPageCell />
    </View>
  );
};

const FooterSection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell />
      <MyPageCell />
      <MyPageCell />
    </View>
  );
};

const MyPageCell = () => {
  return (
    <Pressable>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typo.Body variant="body9">MyPage Cell</Typo.Body>
        <Typo.Body variant="body1">""</Typo.Body>
      </View>
    </Pressable>
  );
};

export const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Typo.Head variant="head1">MyPage</Typo.Head>
      <HeaderSection />
      <BodySection />
      <FooterSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: '#F2F3F6',
    gap: 12,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 14,
    gap: 24,
    borderRadius: 10,
    flexDirection: 'column',
  },
});
