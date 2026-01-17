import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { useSignup } from '../../shared/contexts/SignupContext';
import { AuthAPI } from '../../api/authAPI';
import { tokenStorage } from '../../storage/tokenStorage';

const formatTimeLabel = (
  meridiem: '오전' | '오후',
  hour: number,
  minute: number
) => `${meridiem} ${hour}시 ${String(minute).padStart(2, '0')}분`;

// TimePickerValue를 "HH:mm" 형식으로 변환
const formatTime24h = (value: TimePickerValue): string => {
  let hour24 = value.hour;
  if (value.meridiem === '오후' && value.hour !== 12) {
    hour24 = value.hour + 12;
  } else if (value.meridiem === '오전' && value.hour === 12) {
    hour24 = 0;
  }
  return `${String(hour24).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}`;
};

export const ReminderScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<StackNavParamList, typeof Routes.ONBOARDING_REMINDER>
    >();
  const { signupData, resetSignupData } = useSignup();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeValue, setTimeValue] = useState<TimePickerValue>({
    meridiem: '오후',
    hour: 9,
    minute: 30,
  });

  const timeLabel = useMemo(
    () => formatTimeLabel(timeValue.meridiem, timeValue.hour, timeValue.minute),
    [timeValue]
  );

  const fcmToken =
    'fE95HlthQduywPbyucNu6B:APA91bFw7lZzzNI0Mzh3vK9GQfIW0yCm9DVO8r8X8hJIiGdoadOVLjTZb0m1VRNJgOHLlOK5uB1J2KNdJ-LQOdd6yHeWCigWlhCtQmh-jRAKiUJA7HoLpbA';

  const handleSignupAndAlarm = async (alarmTime: string | null) => {
    if (!signupData.platform || !signupData.platformToken) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. 회원가입 API 호출
      const signupResponse = await AuthAPI.postSignup(signupData.platformToken, {
        platform: signupData.platform,
        email: signupData.email,
        name: signupData.name,
        fcmToken,
        gender: signupData.gender || undefined,
        birthDate: signupData.birthDate || undefined,
      });

      // 토큰 저장
      await tokenStorage.saveTokens(signupResponse.accessToken, signupResponse.refreshToken);

      // 2. 알림 설정 API 호출
      await AuthAPI.postAlarm({
        isDiaryAlarm: alarmTime !== null,
        isReplyAlarm: false,
        isDraftAlarm: false,
        fcmToken,
        time: alarmTime,
      });

      // 회원가입 데이터 초기화
      resetSignupData();

      // 메인탭으로 이동
      navigation.navigate(Routes.MAIN_TAB);
    } catch (error) {
      // 에러 처리
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

  return (
    <SectionPage
      header={{
        prefix: true,
        suffix: (
          <Pressable onPress={handleSkip} disabled={isLoading}>
            <Typo.Body variant="body2" color="gray400">
              건너뛰기
            </Typo.Body>
          </Pressable>
        ),
      }}
      contentsStyle={styles.contents}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.textBlock}>
            <Typo.Head variant="head1" style={styles.title}>
              몇 시에 감사일기
            </Typo.Head>
            <Typo.Head variant="head1" style={styles.title}>
              작성 알림을 드릴까요?
            </Typo.Head>
            <Typo.Caption variant="caption2" color="gray400">
              잊지 않고 감사일기를 작성할 수 있도록 알림을 보내드려요
            </Typo.Caption>
          </View>

          <View style={styles.inputBlock}>
            <Pressable
              style={styles.timeField}
              onPress={() => setSheetVisible(true)}
            >
              <Typo.Body variant="body2" color="gray1000">
                {timeLabel}
              </Typo.Body>
              <Icon.IcDown width={16} height={16} />
            </Pressable>
          </View>
        </View>

        <BottomActionButton
          title="다음"
          onPress={handleNext}
          isDisabled={isLoading}
          containerStyle={styles.bottomButton}
          buttonStyle={styles.bottomButtonInner}
          buttonStyleOnKeyboard={styles.bottomButtonInnerKeyboard}
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
  contents: {},
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textBlock: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 4,
    color: palette.gray1000,
  },
  inputBlock: {
    marginTop: 40,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
  },
  bottomButtonInner: {
    borderRadius: 6,
  },
  bottomButtonInnerKeyboard: {
    borderRadius: 0,
  },
});
