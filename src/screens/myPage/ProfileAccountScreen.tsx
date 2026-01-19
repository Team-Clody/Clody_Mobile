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
import { useModal } from '../../shared/contexts/ModalContext';

type MyPageScreenNavigationProp = StackNavigationProp<MyPageStackParamList>;

export const ProfileAccountScreen = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { myPageInfo } = useMypage();
  const navigateToEditNickname = () => {
    navigation.navigate(MyPageRoutes.EDIT_NICKNAME);
  };

  return (
    <SectionPage
      header={{
        title: '프로필 및 계정관리',
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
  return (
    <View style={styles.section}>
      <ProfileAcountCell
        title="닉네임"
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
        title="이메일"
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            {email}
          </Typo.Body>
        }
      />
      <ProfileAcountCell
        title="생년월일"
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            {birthDate}
          </Typo.Body>
        }
      />
      <ProfileAcountCell
        title="성별"
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
  const { showModal } = useModal();

  return (
    <View style={styles.footerSection}>
      <Pressable onPress={() => showModal('logout')}>
        <Typo.Body variant="body9" color="#4A4C54">
          로그아웃
        </Typo.Body>
      </Pressable>
      <Pressable onPress={() => showModal('revoke')}>
        <Typo.Body variant="body9" color="#4A4C54">
          탈퇴하기
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
