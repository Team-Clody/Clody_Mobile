import { Pressable, StyleSheet, TextInput, View, Alert } from 'react-native';
import { BottomActionButton, SectionPage, Typo } from '../../shared/components';
import { useState } from 'react';
import { Icon } from '../../shared/components/Icon';
import { useMypage } from '../../hooks/myPage/useMypage';
import { useNavigation } from '@react-navigation/native';

export const EditNicknameScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { patchNickname } = useMypage();

  const updateNickname = async (nickname: string) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await patchNickname({ name: nickname });
      Alert.alert('성공', '닉네임이 변경되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('오류', '닉네임 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionPage
      header={{ title: 'Edit Nickname', prefix: true }}
      contentsStyle={{ paddingHorizontal: 14 }}
    >
      <View style={{ flex: 1 }}>
        <HeaderSection nickname={nickname} setNickname={setNickname} />
      </View>
      <BottomActionButton
        title="저장"
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
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <View style={styles.textInputContainer}>
        <NicknameInput
          style={styles.textInput}
          maxLength={10}
          nickname={nickname}
          setNickname={setNickname}
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
}: {
  style: any;
  maxLength: number;
  nickname: string;
  setNickname: (nickname: string) => void;
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
