import React from 'react';
import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Typo } from './typo/Typo';
import { Icon } from './Icon';
import { palette } from '../theme/palette';

interface TermsBottomSheetProps {
  visible: boolean;
  onAgree: () => void;
  onClose: () => void;
}

const TERMS_OF_SERVICE_URL_KO = 'https://www.notion.so/1c7e3fedb3f4802c8db1f3056c03973f?source=copy_link';
const TERMS_OF_SERVICE_URL_EN = 'https://www.notion.so/Clody-Terms-of-Service-22ae3fedb3f48092ace1fba817df8605?source=copy_link';
const PRIVACY_POLICY_URL_KO = 'https://www.notion.so/1c7e3fedb3f48024a334c8116255b378?source=copy_link';
const PRIVACY_POLICY_URL_EN = 'https://tropical-buckthorn-d17.notion.site/Clody-Privacy-Policy-22ae3fedb3f4808ab8dcc8ba60ad6cd6'; 

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
      <Typo.Caption variant="caption2" color="gray700">
        {title}
      </Typo.Caption>
      <Icon.IcNext width={16} height={16} />
    </Pressable>
  );
};

export const TermsBottomSheet = ({
  visible,
  onAgree,
  onClose,
}: TermsBottomSheetProps) => {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isKorean = i18n.language === 'ko';

  const termsOfServiceUrl = isKorean ? TERMS_OF_SERVICE_URL_KO : TERMS_OF_SERVICE_URL_EN;
  const privacyPolicyUrl = isKorean ? PRIVACY_POLICY_URL_KO : PRIVACY_POLICY_URL_EN;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} />
        <View>
          <View style={styles.sheet}>
            <Typo.Head variant="head2" style={styles.title}>
              {t('onboarding.terms.title')}
            </Typo.Head>

            <View style={styles.termsContainer}>
              <TermsItem
                title={t('onboarding.terms.termsOfService')}
                url={termsOfServiceUrl}
              />
              <TermsItem
                title={t('onboarding.terms.privacyPolicy')}
                url={privacyPolicyUrl}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button title={t('onboarding.terms.agree')} onPress={onAgree} />
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Typo.Body variant="body9" color="gray500">
                  {t('onboarding.terms.close')}
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
    paddingVertical: 15,
  },
  bottomFill: {
    backgroundColor: palette.gray0,
  },
});
