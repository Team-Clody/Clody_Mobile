import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionPage, Typo } from '../../shared/components';
import { Button } from '../../shared/components/Button';
import { Icon } from '../../shared/components/Icon';
import { palette } from '../../shared/theme/palette';
import { Routes, StackNavParamList } from '../../navigation/route';
import { useSignup } from '../../shared/contexts/SignupContext';

type NicknameScreenNavigationProp = StackNavigationProp<
  StackNavParamList,
  typeof Routes.ONBOARDING_NICKNAME
>;

export const NicknameScreen = () => {
  const navigation = useNavigation<NicknameScreenNavigationProp>();
  const { setName } = useSignup();
  const [nickname, setNickname] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const isEmpty = nickname.length === 0;
  const isTooLong = nickname.length > 10;
  const isAllowedChars = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(nickname);
  const hasError = !isEmpty && (isTooLong || !isAllowedChars);
  const isDisabled = isEmpty || hasError;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleChangeNickname = (text: string) => {
    if (text.length > 10) {
      setNickname(text.slice(0, 10));
      return;
    }

    setNickname(text);
  };

  return (
    <SectionPage header={{ prefix: true }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View>
          <View style={styles.textBlock}>
            <Typo.Display variant="display1" style={styles.title}>
              만나서 반가워요
            </Typo.Display>
            <Typo.Display variant="display1" style={styles.title}>
              어떻게 불러드릴까요?
            </Typo.Display>
            <Typo.Caption variant="caption2" color={palette.gray500}>
              프로필에 보일 닉네임이에요
            </Typo.Caption>
          </View>

          <View style={styles.inputBlock}>
            <View style={[styles.textInputContainer, hasError && styles.textInputError]}>
              <TextInput
                value={nickname}
                onChangeText={handleChangeNickname}
                placeholder="닉네임을 입력해주세요."
                placeholderTextColor={palette.gray400}
                style={styles.textInput}
                returnKeyType="default"
              />
              <Pressable
                style={[
                  styles.deleteButton,
                ]}
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
                <Typo.Caption
                  variant="caption3"
                  color="#E0565B"
                >
                  닉네임은 한글,영문,숫자만 가능해요.
                </Typo.Caption>
              )}
              <Typo.Caption
                variant="caption3"
                color="#8791A0"
                style={styles.counter}
              >
                {nickname.length}/10
              </Typo.Caption>
            </View>
          </View>
        </View>

        <View style={[styles.footer, isKeyboardVisible && styles.footerKeyboardVisible]}>
          <Button
            title="다음"
            onPress={() => {
              setName(nickname);
              navigation.navigate(Routes.ONBOARDING_BIRTHDAY);
            }}
            isDisabled={isDisabled}
            containerStyle={isKeyboardVisible ? styles.buttonKeyboardVisible : undefined}
          />
        </View>
      </KeyboardAvoidingView>
    </SectionPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textBlock: {
    paddingTop: 2,
    paddingHorizontal: 14,
  },
  title: {
    color: '#1B1D1F',
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
  errorText: {
    marginTop: 6,
  },
  footer: {
    paddingBottom: 16,
    paddingHorizontal: 14,
  },
  footerKeyboardVisible: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  buttonKeyboardVisible: {
    borderRadius: 0,
  },
});
