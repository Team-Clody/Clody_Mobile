import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useModal } from '../../contexts/ModalContext';
import { Typo } from '../typo/Typo';
import { palette } from '../../theme/palette';
import { useTranslation } from '../../hooks/useTranslation';

export const SoftUpdateModal = () => {
  const { visibleModal, hideModal, updateModalData } = useModal();
  const { t } = useTranslation();
  const isVisible = visibleModal === 'softUpdate';

  const currentVersion = updateModalData?.currentVersion || '';
  const latestVersion = updateModalData?.latestVersion || '';

  const handleConfirm = () => {
    // TODO: 스토어로 이동하는 로직 구현
    hideModal();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.modalContainer}>
        <Typo.Display variant="display3" color="gray1000" style={styles.title}>
          {t('modal.softUpdate.title')}
        </Typo.Display>

        <Typo.Caption
          variant="caption1"
          color="gray500"
          style={styles.description}
        >
          {t('modal.softUpdate.description', {
            currentVersion,
            latestVersion,
          })}
        </Typo.Caption>

        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={hideModal}
            style={[styles.button, { backgroundColor: palette.gray100 }]}
          >
            <Typo.Body variant="body3" color="gray500">
              {t('modal.softUpdate.cancel')}
            </Typo.Body>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            style={[styles.button, { backgroundColor: palette.gray800 }]}
          >
            <Typo.Body variant="body3" color="gray0">
              {t('modal.softUpdate.confirm')}
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
    paddingHorizontal: 24,
    zIndex: 9999,
  },
  modalContainer: {
    width: '100%',
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
