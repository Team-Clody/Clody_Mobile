import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { useState } from 'react';
import { Icon } from '../../shared/components/Icon';
import { useMypage } from '../../hooks/myPage/useMypage';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDevice } from '../../shared/contexts/DeviceContext';
import { useToast } from '../../shared/contexts/ToastContext';

export const EditNicknameScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isKorean } = useDevice();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { patchNickname, myPageInfo } = useMypage();
  const [nickname, setNickname] = useState(myPageInfo?.name || '');
  const [error, setError] = useState('');

  const maxLength = isKorean ? 10 : 15;

  const validateNickname = (text: string) => {
    // 한글, 영문, 숫자만 허용
    const regex = /^[가-힣a-zA-Z0-9]*$/;

    if (text.length > maxLength) {
      setError(t('myPage.editNicknameScreen.nicknameError'));
      return false;
    }

    if (text && !regex.test(text)) {
      setError(t('myPage.editNicknameScreen.nicknameError'));
      return false;
    }

    setError('');
    return true;
  };

  const handleNicknameChange = (text: string) => {
    if (text.length <= maxLength) {
      setNickname(text);
      validateNickname(text);
    }
  };

  const updateNickname = async (nickname: string) => {
    if (isLoading || error || !nickname) return;

    setIsLoading(true);
    try {
      await patchNickname({ name: nickname });
      showToast(t('myPage.editNicknameScreen.changeComplete'));
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionPage
      header={{
        title: t('myPage.editNicknameScreen.title'),
        prefix: true,
        style: { paddingTop: 12 },
      }}
      contentsStyle={{ paddingHorizontal: 14 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <HeaderSection
            nickname={nickname}
            setNickname={handleNicknameChange}
            error={error}
            maxLength={maxLength}
          />
        </View>
      </TouchableWithoutFeedback>
      <BottomActionButton
        title={t('myPage.editNicknameScreen.save')}
        onPress={() => updateNickname(nickname)}
        isDisabled={nickname.length === 0 || isLoading || !!error}
      />
    </SectionPage>
  );
};

const HeaderSection = ({
  nickname,
  setNickname,
  error,
  maxLength,
}: {
  nickname: string;
  setNickname: (nickname: string) => void;
  error: string;
  maxLength: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <View
        style={[
          styles.textInputContainer,
          isFocused && { borderColor: '#1B1C20' },
          error && { borderColor: '#FF5C5C' },
        ]}
      >
        <NicknameInput
          style={styles.textInput}
          maxLength={maxLength}
          nickname={nickname}
          setNickname={setNickname}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Pressable onPress={() => setNickname('')}>
          <Icon.IcInputDelete width={18} height={18} />
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 2,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {error ? (
          <Typo.Caption variant="caption3" color="#FF5C5C">
            {error}
          </Typo.Caption>
        ) : (
          <View />
        )}
        <Typo.Caption variant="caption3" color="#8791A0">
          {nickname.length}/{maxLength}
        </Typo.Caption>
      </View>
    </View>
  );
};

const NicknameInput = ({
  style,
  maxLength,
  nickname,
  setNickname,
  onFocus,
  onBlur,
}: {
  style: any;
  maxLength: number;
  nickname: string;
  setNickname: (nickname: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}) => {
  return (
    <TextInput
      value={nickname}
      onChangeText={t => {
        setNickname(t);
      }}
      placeholderTextColor={'#4A4C54'}
      style={style}
      maxLength={maxLength}
      returnKeyType="default"
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 14,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#ABAFBB',
    borderRadius: 6,
  },
  textInput: {
    height: 46,
    flex: 1,
  },
});
