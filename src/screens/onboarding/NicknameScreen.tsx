import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SectionPage, Typo } from '../../shared/components';
import { Button } from '../../shared/components/Button';
import { Icon } from '../../shared/components/Icon';

export const NicknameScreen = () => {
  const [nickname, setNickname] = useState('');
  const isEmpty = nickname.length === 0;
  const isTooLong = nickname.length > 10;
  const isAllowedChars = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(nickname);
  const hasError = !isEmpty && (isTooLong || !isAllowedChars);
  const isDisabled = isEmpty || hasError;

  const handleChangeNickname = (text: string) => {
    if (text.length > 10) {
      setNickname(text.slice(0, 10));
      return;
    }

    setNickname(text);
  };

  return (
    <SectionPage header={{ prefix: true }} contentsStyle={styles.contents}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View>
          <View style={styles.textBlock}>
            <Typo.Head variant="head1" style={styles.title}>
              만나서 반가워요
            </Typo.Head>
            <Typo.Head variant="head1" style={styles.title}>
              어떻게 불러드릴까요?
            </Typo.Head>
            <Typo.Caption variant="caption2" color="#8791A0">
              프로필에 보일 닉네임이에요
            </Typo.Caption>
          </View>

          <View style={styles.inputBlock}>
            <View style={styles.textInputContainer}>
              <TextInput
                value={nickname}
                onChangeText={handleChangeNickname}
                placeholder="닉네임을 입력해주세요."
                placeholderTextColor="#8791A0"
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
            <Typo.Caption
              variant="caption3"
              color="#8791A0"
              style={styles.counter}
            >
              {nickname.length}/10
            </Typo.Caption>
            {hasError && (
              <Typo.Caption
                variant="caption3"
                color="#E0565B"
                style={styles.errorText}
              >
                닉네임은 한글,영문,숫자만 가능해요
              </Typo.Caption>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="다음"
            onPress={() => {
              console.log('Next button pressed');
            }}
            isDisabled={isDisabled}
          />
        </View>
      </KeyboardAvoidingView>
    </SectionPage>
  );
};

const styles = StyleSheet.create({
  contents: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textBlock: {
    paddingTop: 12,
  },
  title: {
    marginBottom: 4,
    color: '#1B1D1F',
  },
  inputBlock: {
    marginTop: 24,
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
  textInput: {
    height: '100%',
    flex: 1,
  },
  counter: {
    marginTop: 4,
    textAlign: 'right',
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
  },
});
