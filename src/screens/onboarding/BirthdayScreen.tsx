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

export const BirthdayScreen = () => {
  const [birthday, setBirthday] = useState('');
  const inputRef = useRef<TextInput>(null);
  const isEmpty = birthday.length === 0;
  const isAllowedChars = /^[0-9]+$/.test(birthday);
  const isValidLength = birthday.length === 7;
  const hasError = !isEmpty && (!isAllowedChars || !isValidLength);
  const isDisabled = isEmpty || hasError;

  const handleChangeBirthday = (text: string) => {
    if (text.length > 7) {
      setBirthday(text.slice(0, 7));
      return;
    }
    setBirthday(text);
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
          onPress={() => {
            console.log('Next button pressed');
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
    marginTop: 24,
    paddingHorizontal: 16,
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
    width: 128,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotSlot: {
    width: 8,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastDigit: {
    color: palette.gray1000,
    lineHeight: 16,
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
    paddingHorizontal: 16,
  },
  bottomButtonInner: {
    borderRadius: 6,
  },
  bottomButtonInnerKeyboard: {
    borderRadius: 0,
  },
});
