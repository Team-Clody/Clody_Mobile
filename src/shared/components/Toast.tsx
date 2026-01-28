import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Typo } from './typo/Typo';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 2000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      // 나타나는 애니메이션
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // 지정된 시간 후 사라지는 애니메이션
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 20,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, translateY, onHide]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.toast,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Icon.IcSuccess width={18} height={18} />
        <Typo.Body variant="body4" color="white">
          {message}
        </Typo.Body>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    backgroundColor: '#8791A0',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
});
