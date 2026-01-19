import React from 'react';
import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './Button';
import { Typo } from './Typo';
import { Icon } from './Icon';
import { palette } from '../theme/palette';

interface TermsBottomSheetProps {
  visible: boolean;
  onAgree: () => void;
  onClose: () => void;
}

// TODO: 실제 약관 링크로 교체
const TERMS_OF_SERVICE_URL = 'https://www.notion.so/1c7e3fedb3f4802c8db1f3056c03973f?source=copy_link'; // [필수] 서비스 이용 약관 링크
const PRIVACY_POLICY_URL = 'https://www.notion.so/1c7e3fedb3f48024a334c8116255b378?source=copy_link'; // [필수] 개인정보 수집 및 이용 링크

interface TermsItemProps {
  title: string;
  url: string;
}

const TermsItem = ({ title, url }: TermsItemProps) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <Pressable style={styles.termsItem} onPress={handlePress}>
      <Typo.Body variant="body2" color="gray700">
        {title}
      </Typo.Body>
      <Icon.IcNext width={16} height={16} />
    </Pressable>
  );
};

export const TermsBottomSheet = ({
  visible,
  onAgree,
  onClose,
}: TermsBottomSheetProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} />
        <View>
          <View style={styles.sheet}>
            <Typo.Head variant="head2" style={styles.title}>
              클로디 이용을 위해 동의가 필요해요
            </Typo.Head>

            <View style={styles.termsContainer}>
              <TermsItem
                title="[필수] 서비스 이용 약관"
                url={TERMS_OF_SERVICE_URL}
              />
              <TermsItem
                title="[필수] 개인정보 수집 및 이용"
                url={PRIVACY_POLICY_URL}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="동의하고 시작하기" onPress={onAgree} />
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Typo.Body variant="body4" color="gray500">
                  닫기
                </Typo.Body>
              </Pressable>
            </View>
          </View>
          <View style={[styles.bottomFill, { height: insets.bottom }]} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: palette.gray0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
  },
  title: {
    color: palette.gray1000,
    marginBottom: 20,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonContainer: {
    gap: 12,
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  bottomFill: {
    backgroundColor: palette.gray0,
  },
});
