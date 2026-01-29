import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  BackHandler,
} from 'react-native';
import dayjs from 'dayjs';
import { useModal } from '../../contexts/ModalContext';
import { Typo } from '../typo/Typo';
import { palette } from '../../theme/palette';
import { useTranslation } from '../../hooks/useTranslation';

export const InspectionModal = () => {
  const { visibleModal, hideModal, inspectionModalData } = useModal();
  const { t } = useTranslation();
  const isVisible = visibleModal === 'inspection';

  const handleConfirm = () => {
    hideModal();

    // Android와 iOS에서 앱 종료 처리
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      // iOS에서는 완전 종료는 불가하지만, 최소한 백그라운드로 이동
      BackHandler.exitApp();
    }
  };

  // 날짜 포맷팅: 2026-01-28T18:00:00 -> 1/28 18:00
  const formatInspectionTime = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = dayjs(dateString);
      return date.format('M/D HH:mm');
    } catch (error) {
      console.error('날짜 포맷팅 오류:', error);
      return dateString;
    }
  };

  const formattedStart = inspectionModalData
    ? formatInspectionTime(inspectionModalData.inspectionStart)
    : '';
  const formattedEnd = inspectionModalData
    ? formatInspectionTime(inspectionModalData.inspectionEnd)
    : '';

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.modalContainer}>
        <Typo.Display variant="display3" color="gray1000" style={styles.title}>
          {t('modal.inspection.title')}
        </Typo.Display>

        <Typo.Caption
          variant="caption1"
          color="gray500"
          style={styles.description}
        >
          {t('modal.inspection.description', {
            startTime: formattedStart,
            endTime: formattedEnd,
          })}
        </Typo.Caption>

        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={handleConfirm}
            style={[styles.button, { backgroundColor: palette.gray800 }]}
          >
            <Typo.Body variant="body3" color="gray0">
              {t('modal.inspection.confirm')}
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
    padding: 18,
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
  },
});
