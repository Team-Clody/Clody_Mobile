import { Pressable, StyleSheet, View } from 'react-native';
import { Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';

const HeaderSection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell title="test" onPress={() => console.log('test')} />
      <View style={{ height: 1, backgroundColor: '#F2F3F6' }} />
      <MyPageCell title="test" onPress={() => console.log('test')} />
    </View>
  );
};

const BodySection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell title="test" onPress={() => console.log('test')} />
      <MyPageCell title="test" onPress={() => console.log('test')} />
      <MyPageCell title="test" onPress={() => console.log('test')} />
      <MyPageCell title="test" onPress={() => console.log('test')} />
    </View>
  );
};

const FooterSection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell title="test" onPress={() => console.log('test')} />
      <MyPageCell title="test" onPress={() => console.log('test')} />
      <MyPageCell title="test" onPress={() => console.log('test')} />
    </View>
  );
};

const MyPageCell = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typo.Body variant="body9">{title}</Typo.Body>
        <Icon.IcNext width={28} height={28} />
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
