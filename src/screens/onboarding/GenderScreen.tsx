import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes, StackNavParamList } from '../../navigation/route';
import { useNavigation } from '@react-navigation/native';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { Pressable, StyleSheet, View } from 'react-native';
import { palette } from '../../shared/theme/palette';
import { signupStorage } from '../../storage/signupStorage';
import { useTranslation } from '../../shared/hooks/useTranslation';

type GenderScreenNavigationProp = StackNavigationProp<
  StackNavParamList,
  typeof Routes.ONBOARDING_GENDER
>;

type GenderOption = 'female' | 'male' | 'none';

export const GenderScreen = () => {
  const { t } = useTranslation();
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null,
  );
  const navigation = useNavigation<GenderScreenNavigationProp>();

  const genderOptions: { label: string; value: GenderOption }[] = [
    { label: t('onboarding.gender.female'), value: 'female' },
    { label: t('onboarding.gender.male'), value: 'male' },
    { label: t('onboarding.gender.specifyAnother'), value: 'none' },
  ];

  const handleSkip = async () => {
    await signupStorage.setGender(null);
    navigation.navigate(Routes.ONBOARDING_REMINDER);
  };

  const handleNext = async () => {
    if (selectedGender !== null) {
      await signupStorage.setGender(selectedGender);
    }
    navigation.navigate(Routes.ONBOARDING_REMINDER);
  };

  const isDisabled = selectedGender === null;

  const SkipButton = (
    <Pressable onPress={handleSkip}>
      <Typo.Body
        variant="body4"
        color={palette.gray500}
        style={{ marginRight: -14 }}
      >
        {t('onboarding.gender.skip')}
      </Typo.Body>
    </Pressable>
  );

  return (
    <SectionPage
      header={{ prefix: true, suffix: SkipButton }}
      containerStyle={styles.container}
    >
      <Typo.Display
        variant="display1"
        color={palette.gray1000}
        style={styles.title}
      >
        {t('onboarding.gender.title')}
      </Typo.Display>
      <Typo.Caption
        variant="caption2"
        color={palette.gray500}
        style={styles.description}
      >
        {t('onboarding.gender.description')}
      </Typo.Caption>

      <View style={{ flex: 1 }} />

      <View style={styles.genderButtonsWrapper}>
        {genderOptions.map(option => {
          const isSelected = selectedGender === option.value;
          return (
            <Pressable
              key={option.value}
              style={[
                styles.genderButton,
                isSelected && styles.genderButtonSelected,
              ]}
              onPress={() => setSelectedGender(option.value)}
            >
              <Typo.Body
                variant="body8"
                color={isSelected ? 'gray30' : 'gray1000'}
              >
                {option.label}
              </Typo.Body>
            </Pressable>
          );
        })}
      </View>

      <BottomActionButton
        title={t('onboarding.gender.button')}
        onPress={handleNext}
        isDisabled={isDisabled}
        containerStyle={styles.bottomButton}
      />
    </SectionPage>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },
  title: {
    marginTop: 16,
  },
  description: {
    marginTop: 8,
  },
  genderButtonsWrapper: {
    marginBottom: 16,
    gap: 10,
  },
  genderButton: {
    backgroundColor: palette.gray30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  genderButtonSelected: {
    backgroundColor: '#293038',
  },
  bottomButton: {
    marginBottom: 20,
  },
});
