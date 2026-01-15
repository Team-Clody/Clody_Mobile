import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BottomActionButton,
  SectionPage,
  TimePickerBottomSheet,
  Typo,
} from '../../shared/components';
import { palette } from '../../shared/theme/palette';
import { Routes, StackNavParamList } from '../../navigation/route';

const formatTimeLabel = (
  meridiem: '오전' | '오후',
  hour: number,
  minute: number
) => `${meridiem} ${hour}시 ${String(minute).padStart(2, '0')}분`;

export const ReminderScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<StackNavParamList, Routes.ONBOARDING_REMINDER>
    >();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [timeValue, setTimeValue] = useState({
    meridiem: '오후' as const,
    hour: 9,
    minute: 30,
  });

  const timeLabel = useMemo(
    () => formatTimeLabel(timeValue.meridiem, timeValue.hour, timeValue.minute),
    [timeValue]
  );

  return (
    <SectionPage
      header={{
        prefix: true,
        suffix: (
          <Pressable onPress={() => navigation.navigate(Routes.HOME)}>
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
              <Typo.Body variant="body2" color="gray400">
                ˅
              </Typo.Body>
            </Pressable>
          </View>
        </View>

        <BottomActionButton
          title="다음"
          onPress={() => navigation.navigate(Routes.HOME)}
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
    marginTop: 16,
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
