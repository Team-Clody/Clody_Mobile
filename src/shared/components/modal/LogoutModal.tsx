import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useModal } from '../../contexts/ModalContext';
import { Typo } from '../typo/Typo';
import { palette } from '../../theme/palette';
import { useTranslation } from '../../hooks/useTranslation';
import { handleLogout } from '../../../auth/handleLogout';
import RNRestart from 'react-native-restart';

export const LogoutModal = () => {
  const { visibleModal, hideModal, setLogoutSuccess } = useModal();
  const { t } = useTranslation();
  const isVisible = visibleModal === 'logout';

  const handleConfirm = async () => {
    try {
      const isSuccess = await handleLogout();
      if (isSuccess) {
        setLogoutSuccess(true);
        hideModal();
        RNRestart.restart();
      }
    } catch (error) {
      console.error('[LogoutModal] 로그아웃 실패:', error);
      hideModal();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.modalContainer}>
        <Typo.Display variant="display3" color="gray1000" style={styles.title}>
          {t('modal.logout.title')}
        </Typo.Display>

        <Typo.Caption
          variant="caption1"
          color="gray500"
          style={styles.description}
        >
          {t('modal.logout.description')}
        </Typo.Caption>

        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={hideModal}
            style={[styles.button, { backgroundColor: palette.gray100 }]}
          >
            <Typo.Body variant="body3" color="gray500">
              {t('modal.logout.cancel')}
            </Typo.Body>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            style={[styles.button, { backgroundColor: palette.gray800 }]}
          >
            <Typo.Body variant="body3" color="gray0">
              {t('modal.logout.confirm')}
            </Typo.Body>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContainer: {
    marginHorizontal: 24,
    backgroundColor: palette.gray0,
    borderRadius: 12,
  },
  title: {
    marginTop: 18,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '100%',
    padding: 18,
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
  },
});
