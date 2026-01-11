import { Pressable, StyleSheet, View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';

export const ProfileAccountScreen = () => {
  return (
    <SectionPage header={{ title: '프로필 및 계정관리', prefix: true }}>
      <HeaderSection />
      <View style={{ height: 12, backgroundColor: '#F2F3F6' }} />
      <FooterSection />
    </SectionPage>
  );
};

const HeaderSection = () => {
  return (
    <View style={styles.section}>
      <ProfileAcountCell
        title="닉네임"
        suffix={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Typo.Body variant="body9" color="#4A4C54">
              Lody
            </Typo.Body>
            <Icon.IcNext width={28} height={28} />
          </View>
        }
      />
      <ProfileAcountCell
        title="이메일"
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            clody@icloud.com
          </Typo.Body>
        }
      />
      <ProfileAcountCell
        title="생년월일"
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            2024.09.07
          </Typo.Body>
        }
      />
      <ProfileAcountCell
        title="성별"
        suffix={
          <Typo.Body variant="body9" color="#4A4C54">
            남성
          </Typo.Body>
        }
      />
    </View>
  );
};

const FooterSection = () => {
  return (
    <View style={styles.footerSection}>
      <Pressable onPress={() => console.log('Logout')}>
        <Typo.Body variant="body9" color="#4A4C54">
          로그아웃
        </Typo.Body>
      </Pressable>
      <Pressable onPress={() => console.log('Logout')}>
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
}: {
  title: string;
  suffix?: React.ReactNode;
}) => {
  return (
    <View
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
    </View>
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
