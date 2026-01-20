import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
import { isKoreanLocale, getLanguageCode } from '../../shared/utils/locale';

type NicknameScreenNavigationProp = StackNavigationProp<
  StackNavParamList,
  typeof Routes.ONBOARDING_NICKNAME
>;

export const NicknameScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NicknameScreenNavigationProp>();
  const [nickname, setNickname] = useState('');
  const isKorean = getLanguageCode() === 'ko';
  const maxLength = isKorean ? 10 : 15;
  const isEmpty = nickname.length === 0;
  const isTooLong = nickname.length > maxLength;
  const isAllowedChars = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(nickname);
  const hasError = !isEmpty && (isTooLong || !isAllowedChars);
  const isDisabled = isEmpty || hasError;

  const handleChangeNickname = (text: string) => {
    if (text.length > maxLength) {
      setNickname(text.slice(0, maxLength));
      return;
    }

    setNickname(text);
  };

  return (
    <SectionPage header={{ prefix: true }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View>
          <Typo.Display variant="display1" style={styles.title}>
            {t('onboarding.nickname.title')}
          </Typo.Display>
          <Typo.Caption variant="caption2" color={palette.gray500} style={styles.subtitle}>
            {t('onboarding.nickname.subtitle')}
          </Typo.Caption>

          <View style={styles.inputBlock}>
            <View
              style={[
                styles.textInputContainer,
                hasError && styles.textInputError,
              ]}
            >
              <TextInput
                value={nickname}
                onChangeText={handleChangeNickname}
                placeholder={t('onboarding.nickname.placeholder')}
                placeholderTextColor={palette.gray400}
                style={styles.textInput}
                returnKeyType="default"
              />
              <Pressable
                style={[styles.deleteButton]}
                disabled={isEmpty}
                onPress={() => {
                  setNickname('');
                }}
              >
                <Icon.IcDelete width={18} height={18} />
              </Pressable>
            </View>
            <View style={styles.captionRow}>
              {hasError && (
                <Typo.Caption variant="caption3" color="#E0565B">
                  {t('onboarding.nickname.error')}
                </Typo.Caption>
              )}
              <Typo.Caption
                variant="caption3"
                color="#8791A0"
                style={styles.counter}
              >
                {nickname.length}/{maxLength}
              </Typo.Caption>
            </View>
          </View>
        </View>

        <BottomActionButton
          title={t('onboarding.nickname.next')}
          onPress={async () => {
            await signupStorage.setName(nickname);
            const nextRoute = isKoreanLocale()
              ? Routes.ONBOARDING_BIRTHDAY
              : Routes.ONBOARDING_BIRTHDAY_EN;
            navigation.navigate(nextRoute);
          }}
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 16,
    paddingHorizontal: 14,
    color: '#1B1D1F',
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
    borderColor: '#ABAFBB',
    borderRadius: 6,
  },
  textInputError: {
    borderColor: '#E0565B',
  },
  textInput: {
    height: '100%',
    flex: 1,
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
  },
  captionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  counter: {
    marginLeft: 'auto',
  },
  deleteButton: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    paddingHorizontal: 14,
  },
  bottomButtonInner: {
    borderRadius: 6,
  },
  bottomButtonInnerKeyboard: {
    borderRadius: 0,
  },
});
