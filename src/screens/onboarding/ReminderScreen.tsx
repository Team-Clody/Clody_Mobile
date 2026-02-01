import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import {
  BottomActionButton,
  Icon,
  SectionPage,
  TimePickerBottomSheet,
  TimePickerValue,
  Typo,
} from '../../shared/components';
import { palette } from '../../shared/theme/palette';
import { Routes, StackNavParamList } from '../../navigation/route';
import { AuthAPI } from '../../api/authAPI';
import { AlarmAPI } from '../../api/alarmAPI';
import { tokenStorage } from '../../storage/tokenStorage';
import { signupStorage } from '../../storage/signupStorage';
import { getLanguageCode } from '../../shared/utils/locale';

export const ReminderScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      StackNavigationProp<StackNavParamList, typeof Routes.ONBOARDING_REMINDER>
    >();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeValue, setTimeValue] = useState<TimePickerValue>({
    meridiem: '오후',
    hour: 9,
    minute: 30,
  });

  const formatTimeLabel = (
    meridiem: '오전' | '오후',
    hour: number,
    minute: number
  ) => {
    const isKorean = getLanguageCode() === 'ko';
    const localizedMeridiem = meridiem === '오전' ? t('onboarding.timePicker.am') : t('onboarding.timePicker.pm');
    if (isKorean) {
      return `${localizedMeridiem} ${hour}시 ${String(minute).padStart(2, '0')}분`;
    }
    return `${hour}:${String(minute).padStart(2, '0')} ${localizedMeridiem}`;
  };

  const formatTime24h = (value: TimePickerValue): string => {
    let hour24 = value.hour;
    if (value.meridiem === '오후' && value.hour !== 12) {
      hour24 = value.hour + 12;
    } else if (value.meridiem === '오전' && value.hour === 12) {
      hour24 = 0;
    }
    return `${String(hour24).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}`;
  };

  const timeLabel = useMemo(
    () => formatTimeLabel(timeValue.meridiem, timeValue.hour, timeValue.minute),
    [timeValue, t]
  );

  const fcmToken =
    'fE95HlthQduywPbyucNu6B:APA91bFw7lZzzNI0Mzh3vK9GQfIW0yCm9DVO8r8X8hJIiGdoadOVLjTZb0m1VRNJgOHLlOK5uB1J2KNdJ-LQOdd6yHeWCigWlhCtQmh-jRAKiUJA7HoLpbA';

  const handleSignupAndAlarm = async (alarmTime: string | null) => {
    const signupData = await signupStorage.getSignupData();

    if (!signupData.platform || !signupData.platformToken) {
      console.log('[Signup] 회원가입 실패: platform 또는 platformToken이 없습니다.');
      return;
    }

    setIsLoading(true);

    const signupRequestBody = {
      platform: signupData.platform,
      email: signupData.email,
      name: signupData.name,
      fcmToken,
      gender: signupData.gender || undefined,
      birthDate: signupData.birthDate || undefined,
    };

    console.log('[Signup] 회원가입 요청:');
    console.log('[Signup] - platformToken:', signupData.platformToken);
    console.log('[Signup] - body:', JSON.stringify(signupRequestBody, null, 2));

    try {
      const signupResponse = await AuthAPI.postSignup(signupData.platformToken, signupRequestBody);

      await tokenStorage.saveTokens(signupResponse.accessToken, signupResponse.refreshToken);

      await AlarmAPI.postAlarm({
        isDiaryAlarm: alarmTime !== null,
        isReplyAlarm: false,
        isDraftAlarm: false,
        fcmToken,
        time: alarmTime,
      });

      await signupStorage.clear();

      navigation.navigate(Routes.MAIN_TAB);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    handleSignupAndAlarm(null);
  };

  const handleNext = () => {
    const time = formatTime24h(timeValue);
    handleSignupAndAlarm(time);
  };

  const SkipButton = (
    <Pressable onPress={handleSkip} disabled={isLoading}>
      <Typo.Body
        variant="body4"
        color={palette.gray400}
      >
        {t('onboarding.reminder.skip')}
      </Typo.Body>
    </Pressable>
  );

  return (
    <SectionPage header={{ prefix: true, suffix: SkipButton }}>
      <View style={styles.container}>
        <View>
          <Typo.Display variant="display1" style={styles.title}>
            {t('onboarding.reminder.title')}
          </Typo.Display>
          <Typo.Caption variant="caption2" color={palette.gray500} style={styles.subtitle}>
            {t('onboarding.reminder.subtitle')}
          </Typo.Caption>

          <View style={styles.inputBlock}>
            <Pressable
              style={styles.timeField}
              onPress={() => setSheetVisible(true)}
            >
              <Typo.Body variant="body10" color="gray1000">
                {timeLabel}
              </Typo.Body>
              <Icon.IcDown width={24} height={24} />
            </Pressable>
          </View>
        </View>

        <BottomActionButton
          title={t('onboarding.reminder.next')}
          onPress={handleNext}
          isDisabled={isLoading}
          containerStyle={styles.bottomButton}
          buttonStyle={styles.bottomButtonInner}
        />
      </View>

      <TimePickerBottomSheet
        visible={sheetVisible}
        initialValue={timeValue}
        onClose={() => setSheetVisible(false)}
        onConfirm={value => {
          setTimeValue(value);
          setSheetVisible(false);
        }}
      />
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
  timeField: {
    height: 46,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: palette.gray300,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomButton: {
    paddingHorizontal: 14,
  },
  bottomButtonInner: {
    borderRadius: 6,
  },
});
