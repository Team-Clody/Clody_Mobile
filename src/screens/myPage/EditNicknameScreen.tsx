import { StyleSheet, View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';
import { Button } from '../../shared/components/Button';

export const EditNicknameScreen = () => {
  return (
    <SectionPage
      header={{ title: 'Edit Nickname', prefix: true }}
      contentsStyle={{ paddingHorizontal: 14 }}
    >
      <View style={{ flex: 1 }}>
        <HeaderSection />
      </View>
      <View>
        <Button
          title="저장"
          onPress={() => {
            console.log('Save button pressed');
          }}
          isDisabled
        />
      </View>
    </SectionPage>
  );
};

const HeaderSection = () => {
  return (
    <View style={styles.section}>
      <EditNicknameCell
        title="닉네임"
        suffix={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Typo.Body variant="body9" color="#4A4C54">
              @clody_official_
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
