import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { Icon } from '../../shared/components/Icon';
import { palette } from '../../shared/theme/palette';
import { Routes, StackNavParamList } from '../../navigation/route';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSignup } from '../../shared/contexts/SignupContext';

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
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(fullYear, month - 1, day);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate <= today;
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
  const [birthday, setBirthday] = useState('');
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<
      StackNavigationProp<StackNavParamList, typeof Routes.ONBOARDING_BIRTHDAY>
    >();
  const { setBirthInfo } = useSignup();
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

  const handleSkip = () => {
    setBirthInfo(null, null);
    navigation.navigate(Routes.ONBOARDING_REMINDER);
  };

  const handleNext = () => {
    const { birthDate, gender } = parseBirthInfo(birthday);
    setBirthInfo(birthDate, gender);
    navigation.navigate(Routes.ONBOARDING_REMINDER);
  };

  const SkipButton = (
    <Pressable onPress={handleSkip}>
      <Typo.Body variant="body4" color={palette.gray400}>
        건너뛰기
      </Typo.Body>
    </Pressable>
  );

  return (
    <SectionPage header={{ prefix: true, suffix: SkipButton }} contentsStyle={styles.contents}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View>
          <View style={styles.textBlock}>
            <Typo.Head variant="head1" style={styles.title}>
              생년월일/성별을
            </Typo.Head>
            <Typo.Head variant="head1" style={styles.title}>
              입력해 주세요
            </Typo.Head>
            <Typo.Caption variant="caption2" color="gray400">
              맞춤형 감사일기 소재를 추천하는 데 필요해요
            </Typo.Caption>
          </View>

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
                returnKeyType="done"
                maxLength={7}
                style={styles.hiddenInput}
              />
              <View style={styles.inputRow}>
                <Typo.Body
                  variant="body2"
                  color={birthday.length === 0 ? 'gray400' : undefined}
                  style={styles.leftDigits}
                >
                  {birthday.length === 0
                    ? '생년월일 6자리'
                    : birthday.slice(0, 6)}
                </Typo.Body>
                <View style={styles.dashContainer}>
                  <Typo.Body variant="body2" color="gray400">
                    -
                  </Typo.Body>
                </View>
                <View style={styles.dotRow}>
                  {Array.from({ length: 7 }, (_, index) => (
                    <View key={`dot-${index}`} style={styles.dotSlot}>
                      {index === 0 ? (
                        birthday.length === 7 ? (
                          <Typo.Body variant="body2" style={styles.lastDigit}>
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
                    올바른 생년월일을 입력해주세요
                  </Typo.Caption>
                )}
              </View>
            </View>
          </View>
        </View>

        <BottomActionButton
          title="다음"
          onPress={handleNext}
          isDisabled={isDisabled}
          containerStyle={styles.bottomButton}
          buttonStyle={styles.bottomButtonInner}
          buttonStyleOnKeyboard={styles.bottomButtonInnerKeyboard}
        />
      </KeyboardAvoidingView>
    </SectionPage>
  );
};

const styles = StyleSheet.create({
  contents: {},
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textBlock: {
    paddingTop: 12,
    paddingHorizontal: 14,
  },
  title: {
    marginBottom: 4,
    color: palette.gray1000,
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
