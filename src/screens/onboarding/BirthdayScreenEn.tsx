import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes, StackNavParamList } from '../../navigation/route';
import { useNavigation } from '@react-navigation/native';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { Pressable, StyleSheet, View } from 'react-native';
import { palette } from '../../shared/theme/palette';
import { signupStorage } from '../../storage/signupStorage';
import {
  BirthdayBottomSheet,
  BirthdayPickerValue,
} from '../../shared/components/BirthdayBottomSheet';
import { useTranslation } from '../../shared/hooks/useTranslation';

type BirthdayEnScreenNavigationProp = StackNavigationProp<
  StackNavParamList,
  typeof Routes.ONBOARDING_BIRTHDAY_EN
>;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatBirthday = (birthday: BirthdayPickerValue): string => {
  const monthName = monthNames[birthday.month - 1];
  return `${monthName} ${birthday.day}, ${birthday.year}`;
};

export const BirthdayScreenEn = () => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState<BirthdayPickerValue | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const navigation = useNavigation<BirthdayEnScreenNavigationProp>();

  const handleSkip = async () => {
    await signupStorage.setBirthInfo(null, null);
    navigation.navigate(Routes.ONBOARDING_GENDER);
  };

  const handleBirthdayConfirm = (value: BirthdayPickerValue) => {
    setBirthday(value);
    setIsBottomSheetVisible(false);
  };

  const isDisabled = !birthday;

  const handleNext = async () => {
    if (birthday) {
      const birthDate = `${birthday.year}-${String(birthday.month).padStart(
        2,
        '0',
      )}-${String(birthday.day).padStart(2, '0')}`;
      await signupStorage.setBirthInfo(birthDate, null);
    }
    navigation.navigate(Routes.ONBOARDING_GENDER);
  };

  const SkipButton = (
    <Pressable onPress={handleSkip}>
      <Typo.Body
        variant="body4"
        color={palette.gray500}
        style={{ marginRight: -14 }}
      >
        {t('onboarding.birthdayEn.skip')}
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
        {t('onboarding.birthdayEn.title')}
      </Typo.Display>
      <Typo.Caption
        variant="caption2"
        color={palette.gray500}
        style={styles.description}
      >
        {t('onboarding.birthdayEn.description')}
      </Typo.Caption>

      <Pressable
        style={styles.birthdayWrapper}
        onPress={() => setIsBottomSheetVisible(true)}
      >
        <Typo.Body
          variant="body10"
          color={birthday ? palette.gray900 : palette.gray400}
        >
          {birthday
            ? formatBirthday(birthday)
            : t('onboarding.birthdayEn.placeholder')}
        </Typo.Body>
      </Pressable>

      <View style={{ flex: 1 }} />

      <BirthdayBottomSheet
        visible={isBottomSheetVisible}
        initialValue={birthday ?? undefined}
        onConfirm={handleBirthdayConfirm}
      />

      <BottomActionButton
        title={t('onboarding.birthdayEn.button')}
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
  birthdayWrapper: {
    marginTop: 40,
    padding: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.gray300,
  },
  bottomButton: {
    marginBottom: 20,
  },
});
