import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './Button';
import { Typo } from './Typo';
import { palette } from '../theme/palette';

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 5;
const PADDING_ITEMS = Math.floor(VISIBLE_ROWS / 2);
const BUTTON_BOTTOM_PADDING = 14;

type Meridiem = '오전' | '오후';

export interface TimePickerValue {
  meridiem: Meridiem;
  hour: number;
  minute: number;
}

interface TimePickerBottomSheetProps {
  visible: boolean;
  initialValue?: TimePickerValue;
  onConfirm: (value: TimePickerValue) => void;
  onClose?: () => void;
}

const meridiemOptions: Meridiem[] = ['오전', '오후'];
const hourOptions = Array.from({ length: 12 }, (_, index) => index + 1);
const minuteOptions = Array.from({ length: 6 }, (_, index) => index * 10);

const toPaddedItems = <T,>(items: T[]) => [
  ...Array(PADDING_ITEMS).fill(null),
  ...items,
  ...Array(PADDING_ITEMS).fill(null),
];

const WheelColumn = <T extends string | number>({
  items,
  value,
  onChange,
  width,
}: {
  items: T[];
  value: T;
  onChange: (value: T) => void;
  width: number;
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
    <View style={[styles.wheelColumn, { width }]}>
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
                  variant="body2"
                  color={isSelected ? 'gray1000' : 'gray400'}
                >
                  {item}
                </Typo.Body>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export const TimePickerBottomSheet = ({
  visible,
  initialValue,
  onConfirm,
  onClose,
}: TimePickerBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const [meridiem, setMeridiem] = useState<Meridiem>(
    initialValue?.meridiem ?? '오전'
  );
  const [hour, setHour] = useState<number>(initialValue?.hour ?? 9);
  const [minute, setMinute] = useState<number>(initialValue?.minute ?? 30);

  const handleConfirm = () => {
    onConfirm({ meridiem, hour, minute });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View>
          <View
            style={[
              styles.sheet,
              {
                paddingBottom: BUTTON_BOTTOM_PADDING,
              },
            ]}
          >
            <Typo.Head variant="head2" style={styles.title}>
              알림 시간을 선택해주세요
            </Typo.Head>
            <View style={styles.wheelRow}>
              <View style={styles.selectionOverlay} pointerEvents="none" />
              <WheelColumn
                items={meridiemOptions}
                value={meridiem}
                onChange={setMeridiem}
                width={80}
              />
              <WheelColumn
                items={hourOptions}
                value={hour}
                onChange={setHour}
                width={80}
              />
              <WheelColumn
                items={minuteOptions}
                value={minute}
                onChange={setMinute}
                width={80}
              />
            </View>
            <View style={styles.buttonRow}>
              <Button title="확인" onPress={handleConfirm} />
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    color: palette.gray1000,
  },
  wheelRow: {
    marginTop: 8,
    height: ITEM_HEIGHT * VISIBLE_ROWS,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  wheelColumn: {
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
  buttonRow: {
    marginTop: 20,
  },
  bottomFill: {
    backgroundColor: palette.gray0,
  },
});
