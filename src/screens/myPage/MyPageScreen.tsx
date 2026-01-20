import { Pressable, StyleSheet, View, Linking } from 'react-native';
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
import { useDevice } from '../../shared/contexts/DeviceContext';
import { useTranslation } from 'react-i18next';

type MyPageScreenNavigationProp = StackNavigationProp<MyPageStackParamList>;

export const MyPageScreen = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { myPageInfo, fetchMyPageInfo } = useMypage();
  const { t } = useTranslation();

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
          {t('myPage.myPageScreen.title')}
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
  const { t } = useTranslation();

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
          <Typo.Body variant="body9">
            {t('myPage.myPageScreen.myClover')}
          </Typo.Body>
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
  const { isKoreanLanguage } = useDevice();
  const { t } = useTranslation();

  const openNotices = () => {
    const url = isKoreanLanguage
      ? 'https://www.notion.so/1c7e3fedb3f48029b36cf9d76c5fb6d6?pvs=21'
      : 'https://tropical-buckthorn-d17.notion.site/Notice-22ae3fedb3f480feb229e7dcc7a23887?source=copy_link';
    Linking.openURL(url);
  };

  const openSupportFeedback = () => {
    const url = isKoreanLanguage
      ? 'https://docs.google.com/forms/d/e/1FAIpQLSeCS3Z9ctFyqHZH7qkryOEQYQdhvNCMPT6QJ3J2GQw86WId4Q/viewform'
      : 'https://docs.google.com/forms/d/e/1FAIpQLSe1LJg6tYaWBY2ji3O1smCH1ux5ItbVyGVUQko-Mg609Xt9eg/viewform';
    Linking.openURL(url);
  };

  const openFAQ = async () => {
    console.log(isKoreanLanguage);
    const url = isKoreanLanguage
      ? 'https://www.notion.so/2c6e3fedb3f480f1b758f7e520eb1d2a?source=copy_link'
      : 'https://www.notion.so/FAQ-2c6e3fedb3f4801fb61ed12303b708ac?source=copy_link';
    await Linking.openURL(url);
  };

  return (
    <View style={styles.section}>
      <MyPageCell
        title={t('myPage.myPageScreen.notification')}
        onPress={() => console.log('test')}
      />
      <MyPageCell
        title={t('myPage.myPageScreen.notices')}
        onPress={openNotices}
      />
      <MyPageCell
        title={t('myPage.myPageScreen.Support/Feedback')}
        onPress={openSupportFeedback}
      />
      <MyPageCell title={t('myPage.myPageScreen.FAQ')} onPress={openFAQ} />
      <MyPageCell
        title={t('myPage.myPageScreen.Team Clody')}
        onPress={navigateToTeamInfo}
      />
    </View>
  );
};

const FooterSection = () => {
  const { isKoreanLanguage, appVersion } = useDevice();
  const { t } = useTranslation();

  const openTermsOfService = () => {
    const url = isKoreanLanguage
      ? 'https://www.notion.so/1c7e3fedb3f4802c8db1f3056c03973f?pvs=21'
      : 'https://tropical-buckthorn-d17.notion.site/Clody-Terms-of-Use-22ae3fedb3f48092ace1fba817df8605?source=copy_link';
    Linking.openURL(url);
  };

  const openPrivacyPolicy = () => {
    const url = isKoreanLanguage
      ? 'https://www.notion.so/1c7e3fedb3f48024a334c8116255b378?pvs=21'
      : 'https://tropical-buckthorn-d17.notion.site/Clody-Privacy-Policy-22ae3fedb3f4808ab8dcc8ba60ad6cd6?source=copy_link';
    Linking.openURL(url);
  };

  return (
    <View style={styles.section}>
      <MyPageCell
        title={t('myPage.myPageScreen.Terms of Service')}
        onPress={openTermsOfService}
      />
      <MyPageCell
        title={t('myPage.myPageScreen.Privacy Policy')}
        onPress={openPrivacyPolicy}
      />
      <Pressable onPress={() => console.log('test')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typo.Body variant="body9">
            {t('myPage.myPageScreen.Version')}
          </Typo.Body>
          <Typo.Body variant="body4" color="#A7A9B2">
            {appVersion}
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
