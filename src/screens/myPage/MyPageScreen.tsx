import { Pressable, StyleSheet, View } from 'react-native';
import { Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';

const HeaderSection = () => {
  return (
    <View style={[styles.section, { gap: 12 }]}>
      <Pressable onPress={() => console.log('Profile')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Icon.IcProfile width={42} height={42} />
            <Typo.Body variant="body1">Lody</Typo.Body>
          </View>
          <Icon.IcNext width={28} height={28} />
        </View>
      </Pressable>
      <View style={{ height: 1, backgroundColor: '#F2F3F6' }} />
      <Pressable onPress={() => console.log('Clover')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typo.Body variant="body9">My Clover</Typo.Body>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <Icon.IcClover width={16} height={16} />
            <Typo.Body variant="body9">123</Typo.Body>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const BodySection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell title="Notification" onPress={() => console.log('test')} />
      <MyPageCell title="Notices" onPress={() => console.log('test')} />
      <MyPageCell
        title="Support/Feedback"
        onPress={() => console.log('test')}
      />
      <MyPageCell title="FAQ" onPress={() => console.log('test')} />
      <MyPageCell title="Team Clody" onPress={() => console.log('test')} />
    </View>
  );
};

const FooterSection = () => {
  return (
    <View style={styles.section}>
      <MyPageCell
        title="Terms of Service"
        onPress={() => console.log('test')}
      />
      <MyPageCell title="Privacy Policy" onPress={() => console.log('test')} />
      <Pressable onPress={() => console.log('test')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typo.Body variant="body9">Version</Typo.Body>
          <Typo.Body variant="body4" color="#A7A9B2">
            Latest Version
          </Typo.Body>
        </View>
      </Pressable>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typo.Body variant="body9">{title}</Typo.Body>
        <Icon.IcNext width={28} height={28} />
      </View>
    </Pressable>
  );
};

export const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Typo.Head variant="head1" style={{ marginBottom: 6 }}>
        MyPage
      </Typo.Head>
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
