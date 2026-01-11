import { StyleSheet, View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';

export const EditNicknameScreen = () => {
  return (
    <SectionPage header={{ title: '클로디 팀', prefix: true }}>
      <HeaderSection />
    </SectionPage>
  );
};

const HeaderSection = () => {
  return (
    <View style={styles.section}>
      <EditNicknameCell
        title="인스타그램"
        suffix={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Typo.Body variant="body9" color="#4A4C54">
              @clody_official_
            </Typo.Body>
            <Icon.IcNext width={28} height={28} />
          </View>
        }
      />
      <EditNicknameCell
        title="후원하기"
        suffix={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Typo.Body variant="body9" color="#4A4C54">
              커피 사주기
            </Typo.Body>
            <Icon.IcNext width={28} height={28} />
          </View>
        }
      />
    </View>
  );
};

const EditNicknameCell = ({
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
    gap: 17,
  },
});
