import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { useState } from 'react';
import { Icon } from '../../shared/components/Icon';
import { useMypage } from '../../hooks/myPage/useMypage';
import { useTranslation } from 'react-i18next';

export const EditNicknameScreen = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { patchNickname, myPageInfo } = useMypage();
  const [nickname, setNickname] = useState(myPageInfo?.name || '');

  const updateNickname = async (nickname: string) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await patchNickname({ name: nickname });
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
      contentsStyle={{ paddingHorizontal: 14, paddingBottom: 24 }}
    >
      <View style={{ flex: 1 }}>
        <HeaderSection nickname={nickname} setNickname={setNickname} />
      </View>
      <BottomActionButton
        title={t('myPage.editNicknameScreen.save')}
        onPress={() => updateNickname(nickname)}
        isDisabled={nickname.length === 0 || isLoading}
      />
    </SectionPage>
  );
};

const HeaderSection = ({
  nickname,
  setNickname,
}: {
  nickname: string;
  setNickname: (nickname: string) => void;
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
        ]}
      >
        <NicknameInput
          style={styles.textInput}
          maxLength={10}
          nickname={nickname}
          setNickname={setNickname}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Pressable onPress={() => setNickname('')}>
          <Icon.IcInputDelete width={18} height={18} />
        </Pressable>
      </View>
      <Typo.Caption variant="caption3" color="#8791A0" style={{ marginTop: 2 }}>
        {nickname.length}/10
      </Typo.Caption>
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
