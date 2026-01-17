import { Pressable, StyleSheet, View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  MyPageStackParamList,
  MyPageRoutes,
} from '../../navigation/MyPageNavigationStack';
import { useEffect } from 'react';
import { useMypage } from '../../hooks/myPage/useMypage';

type MyPageScreenNavigationProp = StackNavigationProp<MyPageStackParamList>;

export const MyPageScreen = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { myPageInfo, fetchMyPageInfo } = useMypage();

  useEffect(() => {
    fetchMyPageInfo();
  }, []);

  const navigateToProfileAccount = () => {
    navigation.navigate(MyPageRoutes.PROFILE_ACCOUNT);
  };

  const navigateToTeamInfo = () => {
    navigation.navigate(MyPageRoutes.TEAM_INFO);
  };

  return (
    <SectionPage>
      <View style={styles.container}>
        <Typo.Head variant="head1" style={{ marginBottom: 6 }}>
          MyPage
        </Typo.Head>
        <HeaderSection
          navigateToProfileAccount={navigateToProfileAccount}
          name={myPageInfo?.name}
          clover={myPageInfo?.cloverCount}
        />
        <BodySection navigateToTeamInfo={navigateToTeamInfo} />
        <FooterSection />
      </View>
    </SectionPage>
  );
};

const HeaderSection = ({
  navigateToProfileAccount,
  name,
  clover,
}: {
  navigateToProfileAccount: () => void;
  name?: string;
  clover?: number;
}) => {
  return (
    <View style={[styles.section, { gap: 12 }]}>
      <Pressable onPress={navigateToProfileAccount}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Icon.IcProfile width={42} height={42} />
            <Typo.Body variant="body1">{name}</Typo.Body>
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
            <Typo.Body variant="body9">{clover}</Typo.Body>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const BodySection = ({
  navigateToTeamInfo,
}: {
  navigateToTeamInfo: () => void;
}) => {
  return (
    <View style={styles.section}>
      <MyPageCell title="Notification" onPress={() => console.log('test')} />
      <MyPageCell title="Notices" onPress={() => console.log('test')} />
      <MyPageCell
        title="Support/Feedback"
        onPress={() => console.log('test')}
      />
      <MyPageCell title="FAQ" onPress={() => console.log('test')} />
      <MyPageCell title="Team Clody" onPress={navigateToTeamInfo} />
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
