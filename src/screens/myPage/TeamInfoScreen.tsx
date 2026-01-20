import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';
import { useDevice } from '../../shared/contexts/DeviceContext';
import { useTranslation } from 'react-i18next';

export const TeamInfoScreen = () => {
  const { t } = useTranslation();

  return (
    <SectionPage
      header={{
        title: t('myPage.teamInfoScreen.title'),
        prefix: true,
        style: { paddingTop: 12 },
      }}
    >
      <HeaderSection />
    </SectionPage>
  );
};

const HeaderSection = () => {
  const { isKoreanLanguage } = useDevice();
  const { t } = useTranslation();

  const openInstagram = () => {
    const url = isKoreanLanguage
      ? 'https://www.instagram.com/clody_official_/?igsh=MXZzc3RjbHVyaHh0dg%3D%3D&utm_source=qr#'
      : 'https://www.instagram.com/carewithclody_?igsh=MWF0Nm40enBjaDJ3YQ==';
    Linking.openURL(url);
  };

  const openSupport = () => {
    const url = 'https://buymeacoffee.com/clody';
    Linking.openURL(url);
  };

  return (
    <View style={styles.section}>
      <TeamInfoCell
        title={t('myPage.teamInfoScreen.Instagram')}
        suffix={
          <Pressable
            onPress={openInstagram}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
          >
            <Typo.Body variant="body9" color="#4A4C54">
              @clody_official_
            </Typo.Body>
            <Icon.IcNext width={28} height={28} />
          </Pressable>
        }
      />
      <TeamInfoCell
        title={t('myPage.teamInfoScreen.Support Clody')}
        suffix={
          <Pressable
            onPress={openSupport}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
          >
            <Typo.Body variant="body9" color="#4A4C54">
              {t('myPage.teamInfoScreen.Buy me a coffee')}
            </Typo.Body>
            <Icon.IcNext width={28} height={28} />
          </Pressable>
        }
      />
    </View>
  );
};

const TeamInfoCell = ({
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
