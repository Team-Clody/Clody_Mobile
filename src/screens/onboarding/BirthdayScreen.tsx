import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';
import { palette } from '../../shared/theme/palette';
import { Routes, StackNavParamList } from '../../navigation/route';
import { signupStorage } from '../../storage/signupStorage';

// 주민등록번호 7번째 자리로 출생 연도 계산
const calculateBirthYear = (yearPrefix: string, genderDigit: number): number => {
  // 1~2: 1900년대, 3~4: 2000년대, 5~6: 1900년대 외국인, 7~8: 2000년대 외국인
  const is1900s = genderDigit === 1 || genderDigit === 2 || genderDigit === 5 || genderDigit === 6;
  return (is1900s ? 1900 : 2000) + parseInt(yearPrefix, 10);
};

// 주민등록번호 7번째 자리로 성별 판별 (홀수: male, 짝수: female)
const getGenderFromDigit = (genderDigit: number): string => {
  return genderDigit % 2 === 1 ? 'male' : 'female';
};

const validateBirthday = (value: string): boolean => {
  if (!/^[0-9]{7}$/.test(value)) {
    return false;
  }

  const genderDigit = parseInt(value[6], 10);
  if (genderDigit < 1 || genderDigit > 8) {
    return false;
  }

  const month = parseInt(value.slice(2, 4), 10);
  const day = parseInt(value.slice(4, 6), 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const fullYear = calculateBirthYear(value.slice(0, 2), genderDigit);

  if (fullYear < 1900) {
    return false;
  }

  // 윤년 및 월별 일수 체크
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (fullYear % 4 === 0 && fullYear % 100 !== 0) || fullYear % 400 === 0;
  if (isLeapYear) {
    daysInMonth[1] = 29;
  }

  if (day > daysInMonth[month - 1]) {
    return false;
  }

  // 미래 날짜 체크
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  // 연도 비교
  if (fullYear > todayYear) {
    return false;
  }
  // 같은 연도면 월 비교
  if (fullYear === todayYear && month > todayMonth) {
    return false;
  }
  // 같은 연도, 같은 월이면 일 비교
  if (fullYear === todayYear && month === todayMonth && day > todayDay) {
    return false;
  }

  return true;
};

// 7자리 입력값에서 생년월일(YYYY-MM-DD)과 성별(male/female)을 파싱
const parseBirthInfo = (value: string): { birthDate: string; gender: string } => {
  const yearPrefix = value.slice(0, 2);
  const month = value.slice(2, 4);
  const day = value.slice(4, 6);
  const genderDigit = parseInt(value[6], 10);

  const fullYear = calculateBirthYear(yearPrefix, genderDigit);
  const gender = getGenderFromDigit(genderDigit);

  return {
    birthDate: `${fullYear}-${month}-${day}`,
    gender,
  };
};

export const BirthdayScreen = () => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState('');
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<
      StackNavigationProp<StackNavParamList, typeof Routes.ONBOARDING_BIRTHDAY>
    >();
  const isEmpty = birthday.length === 0;
  const isValidLength = birthday.length === 7;
  const isValid = isValidLength && validateBirthday(birthday);
  const hasError = !isEmpty && isValidLength && !isValid;
  const isDisabled = isEmpty || !isValid;

  const handleChangeBirthday = (text: string) => {
    if (text.length > 7) {
      setBirthday(text.slice(0, 7));
      return;
    }
    setBirthday(text);
  };

  const handleSkip = async () => {
    await signupStorage.setBirthInfo(null, null);
    navigation.navigate(Routes.ONBOARDING_REMINDER);
  };

  const handleNext = async () => {
    const { birthDate, gender } = parseBirthInfo(birthday);
    await signupStorage.setBirthInfo(birthDate, gender);
    navigation.navigate(Routes.ONBOARDING_REMINDER);
  };

  const SkipButton = (
    <Pressable onPress={handleSkip}>
      <Typo.Body variant="body4" color={palette.gray400}>
        {t('onboarding.birthday.skip')}
      </Typo.Body>
    </Pressable>
  );

  return (
    <SectionPage header={{ prefix: true, suffix: SkipButton }}>
      <View style={styles.container}>
        <View>
          <Typo.Display variant="display1" style={styles.title}>
            {t('onboarding.birthday.title')}
          </Typo.Display>
          <Typo.Caption variant="caption2" color={palette.gray500} style={styles.subtitle}>
            {t('onboarding.birthday.subtitle')}
          </Typo.Caption>

          <View style={styles.inputBlock}>
            <Pressable
              style={[
                styles.textInputContainer,
                hasError && styles.textInputContainerError,
              ]}
              onPress={() => inputRef.current?.focus()}
            >
              <TextInput
                ref={inputRef}
                value={birthday}
                onChangeText={handleChangeBirthday}
                keyboardType="number-pad"
                maxLength={7}
                style={styles.hiddenInput}
              />
              <View style={styles.inputRow}>
                <Typo.Body
                  variant="body10"
                  color={birthday.length === 0 ? 'gray400' : undefined}
                  style={styles.leftDigits}
                >
                  {birthday.length === 0
                    ? t('onboarding.birthday.placeholder')
                    : birthday.slice(0, 6)}
                </Typo.Body>
                <View style={styles.dashContainer}>
                  <Typo.Body variant="body10" color="gray400">
                    -
                  </Typo.Body>
                </View>
                <View style={styles.dotRow}>
                  {Array.from({ length: 7 }, (_, index) => (
                    <View key={`dot-${index}`} style={styles.dotSlot}>
                      {index === 0 ? (
                        birthday.length === 7 ? (
                          <Typo.Body variant="body10" style={styles.lastDigit}>
                            {birthday[6]}
                          </Typo.Body>
                        ) : (
                          <Icon.IcDotGray width={8} height={8} />
                        )
                      ) : (
                        <Icon.IcDotBlack width={8} height={8} />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </Pressable>
            <View style={styles.captionRow}>
              <View style={styles.errorSlot}>
                {hasError && (
                  <Typo.Caption
                    variant="caption3"
                    color="red500"
                    style={styles.errorText}
                  >
                    {t('onboarding.birthday.error')}
                  </Typo.Caption>
                )}
              </View>
            </View>
          </View>
        </View>

        <BottomActionButton
          title={t('onboarding.birthday.next')}
          onPress={handleNext}
          isDisabled={isDisabled}
          containerStyle={styles.bottomButton}
          buttonStyle={styles.bottomButtonInner}
          buttonStyleOnKeyboard={styles.bottomButtonInnerKeyboard}
        />
      </View>
    </SectionPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 16,
    paddingHorizontal: 14,
    color: palette.gray1000,
  },
  subtitle: {
    marginTop: 8,
    paddingHorizontal: 14,
  },
  inputBlock: {
    marginTop: 40,
    paddingHorizontal: 14,
  },
  textInputContainer: {
    paddingHorizontal: 14,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.gray300,
    borderRadius: 6,
  },
  textInputContainerError: {
    borderColor: palette.red500,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  leftDigits: {
    width: '45%',
  },
  dashContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -4 }],
  },
  dotRow: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: 30 }],
    width: 132,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotSlot: {
    width: 12,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastDigit: {
    color: palette.gray1000,
    lineHeight: 18,
    textAlign: 'center',
    includeFontPadding: false,
  },
  captionRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorSlot: {
    flex: 1,
  },
  errorText: {
    marginRight: 8,
  },
  bottomButton: {
    paddingHorizontal: 14,
  },
  bottomButtonInner: {
    paddingBottom:2,
    borderRadius: 6,
  },
  bottomButtonInnerKeyboard: {
    borderRadius: 0,
  },
});
