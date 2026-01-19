import { Pressable, StyleSheet, View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  MyPageStackParamList,
  MyPageRoutes,
} from '../../navigation/MyPageNavigationStack';
import { useMypage } from '../../hooks/myPage/useMypage';
import { useTranslation } from 'react-i18next';

type MyPageScreenNavigationProp = StackNavigationProp<MyPageStackParamList>;

export const ProfileAccountScreen = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { myPageInfo } = useMypage();
  const { t } = useTranslation();
  const navigateToEditNickname = () => {
    navigation.navigate(MyPageRoutes.EDIT_NICKNAME);
  };

  return (
    <SectionPage
      header={{
        title: t('myPage.profileAccountScreen.title'),
        prefix: true,
        style: { paddingTop: 12 },
      }}
    >
      <HeaderSection
        navigateToEditNickname={navigateToEditNickname}
        nickname={myPageInfo?.name || ''}
        birthDate={myPageInfo?.birthDate || ''}
        email={myPageInfo?.email || ''}
        gender={myPageInfo?.gender || ''}
      />
      <View style={{ height: 12, backgroundColor: '#F2F3F6' }} />
      <FooterSection />
    </SectionPage>
  );
};

const HeaderSection = ({
  navigateToEditNickname,
  nickname,
  birthDate,
  email,
  gender,
}: {
  navigateToEditNickname: () => void;
  nickname: string;
  birthDate: string;
  email: string;
  gender: string;
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <ProfileAcountCell
        title={t('myPage.profileAccountScreen.nickname')}
        suffix={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Typo.Body variant="body9" color="#4A4C54">
              {nickname}
            </Typo.Body>
            <Icon.IcNext width={28} height={28} />
          </View>
        }
        onPress={navigateToEditNickname}
      />
      <ProfileAcountCell
        title={t('myPage.profileAccountScreen.email')}
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            {email}
          </Typo.Body>
        }
      />
      <ProfileAcountCell
        title={t('myPage.profileAccountScreen.birthdate')}
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            {birthDate}
          </Typo.Body>
        }
      />
      <ProfileAcountCell
        title={t('myPage.profileAccountScreen.gender')}
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            {gender}
          </Typo.Body>
        }
      />
    </View>
  );
};

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.footerSection}>
      <Pressable onPress={() => console.log('Logout')}>
        <Typo.Body variant="body9" color="#4A4C54">
          {t('myPage.profileAccountScreen.logout')}
        </Typo.Body>
      </Pressable>
      <Pressable onPress={() => console.log('Logout')}>
        <Typo.Body variant="body9" color="#4A4C54">
          {t('myPage.profileAccountScreen.withdraw')}
        </Typo.Body>
      </Pressable>
    </View>
  );
};

const ProfileAcountCell = ({
  title,
  suffix,
  onPress,
}: {
  title: string;
  suffix?: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 28,
      }}
    >
      <Typo.Body variant="body9" color="#4A4C54">
        {title}
      </Typo.Body>
      {suffix}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 14,
    paddingTop: 24,
    paddingBottom: 28,
    gap: 17,
    backgroundColor: '#FFF',
  },
  footerSection: {
    paddingHorizontal: 14,
    paddingTop: 28,
    gap: 24,
  },
});
