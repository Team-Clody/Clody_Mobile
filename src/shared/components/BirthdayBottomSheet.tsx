import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Modal, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Button } from './Button';
import { Typo } from './Typo';
import { palette } from '../theme/palette';
import { useTranslation } from '../hooks/useTranslation';

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 5;
const PADDING_ITEMS = Math.floor(VISIBLE_ROWS / 2);
const GRADIENT_HEIGHT = ITEM_HEIGHT * PADDING_ITEMS;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface BirthdayPickerValue {
  day: number;
  month: number; // 1-12
  year: number;
}

interface BirthdayBottomSheetProps {
  visible: boolean;
  initialValue?: BirthdayPickerValue;
  onConfirm: (value: BirthdayPickerValue) => void;
}

const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);
const yearOptions = Array.from(
  { length: 2026 - 1901 + 1 },
  (_, index) => 1901 + index,
);

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

const toPaddedItems = <T,>(items: T[]) => [
  ...Array(PADDING_ITEMS).fill(null),
  ...items,
  ...Array(PADDING_ITEMS).fill(null),
];

const WheelColumn = <T extends string | number>({
  items,
  value,
  onChange,
  formatItem,
}: {
  items: T[];
  value: T;
  onChange: (value: T) => void;
  formatItem?: (item: T) => string;
}) => {
  const data = useMemo(() => toPaddedItems(items), [items]);
  const listRef = useRef<FlatList<T | null>>(null);

  useEffect(() => {
    const index = items.indexOf(value);
    if (index >= 0) {
      listRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [items, value]);

  const handleMomentumEnd = (offsetY: number) => {
    const index = Math.round(offsetY / ITEM_HEIGHT) + PADDING_ITEMS;
    const item = data[index];
    if (item !== null && item !== undefined) {
      onChange(item);
    }
  };

  return (
    <View style={[styles.wheelColumn]}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(_, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={event =>
          handleMomentumEnd(event.nativeEvent.contentOffset.y)
        }
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item }) => {
          const isSelected = item === value;
          return (
            <View style={styles.item}>
              {item === null ? null : (
                <Typo.Body
                  variant="body7"
                  color={isSelected ? 'gray1000' : 'gray400'}
                >
                  {formatItem ? formatItem(item) : String(item)}
                </Typo.Body>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export const BirthdayBottomSheet = ({
  visible,
  initialValue,
  onConfirm,
}: BirthdayBottomSheetProps) => {
  const { t } = useTranslation();
  const [day, setDay] = useState<number>(initialValue?.day ?? 15);
  const [month, setMonth] = useState<number>(initialValue?.month ?? 6);
  const [year, setYear] = useState<number>(initialValue?.year ?? 2010);

  // Reset values when modal opens
  useEffect(() => {
    if (visible && initialValue) {
      setDay(initialValue.day);
      setMonth(initialValue.month);
      setYear(initialValue.year);
    }
  }, [visible, initialValue]);

  // Update available days when month or year changes
  const availableDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(month, year);
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    return days;
  }, [month, year]);

  // Adjust day if it exceeds days in selected month
  useEffect(() => {
    const maxDays = getDaysInMonth(month, year);
    if (day > maxDays) {
      setDay(maxDays);
    }
  }, [month, year, day]);

  const handleConfirm = () => {
    onConfirm({ day, month, year });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Typo.Display variant="display4" color={palette.gray1000}>
            {t('onboarding.birthdayBottomSheet.title')}
          </Typo.Display>

          <View style={styles.wheelRow}>
            <View style={styles.selectionOverlay} pointerEvents="none" />
            <View style={styles.topFade} pointerEvents="none">
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="topGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0.15" stopColor="#FFFFFF" stopOpacity="1" />
                    <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#topGradient)" />
              </Svg>
            </View>
            <View style={styles.bottomFade} pointerEvents="none">
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient
                    id="bottomGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                    <Stop offset="0.85" stopColor="#FFFFFF" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#bottomGradient)" />
              </Svg>
            </View>
            <WheelColumn items={availableDays} value={day} onChange={setDay} />
            <WheelColumn
              items={monthOptions}
              value={month}
              onChange={setMonth}
              formatItem={item => monthNames[item - 1]}
            />
            <WheelColumn items={yearOptions} value={year} onChange={setYear} />
          </View>

          <View style={styles.button}>
            <Button
              title={t('onboarding.birthdayBottomSheet.button')}
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: palette.gray0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 14,
  },
  wheelRow: {
    marginTop: 8,
    height: ITEM_HEIGHT * VISIBLE_ROWS,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  wheelColumn: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ROWS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * PADDING_ITEMS,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderRadius: 8,
    backgroundColor: palette.gray50,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
    zIndex: 1,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
    zIndex: 1,
  },
  button: {
    marginTop: 20,
  },
});
