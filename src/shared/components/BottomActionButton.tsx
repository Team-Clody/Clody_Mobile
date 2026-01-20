import { useEffect, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './Button';

interface BottomActionButtonProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonStyleOnKeyboard?: StyleProp<ViewStyle>;
}

export const BottomActionButton = ({
  title,
  onPress,
  isDisabled,
  containerStyle,
  buttonStyle,
  buttonStyleOnKeyboard,
}: BottomActionButtonProps) => {
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (e: KeyboardEvent) => {
      setIsKeyboardVisible(true);
      if (Platform.OS === 'ios') {
        Animated.timing(keyboardHeight, {
          toValue: e.endCoordinates.height,
          duration: e.duration || 250,
          useNativeDriver: false,
        }).start();
      }
    });
    const hideSubscription = Keyboard.addListener(hideEvent, (e: KeyboardEvent) => {
      setIsKeyboardVisible(false);
      if (Platform.OS === 'ios') {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: e.duration || 250,
          useNativeDriver: false,
        }).start();
      }
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);

  return (
    <Animated.View
      style={[
        styles.container,
        !isKeyboardVisible && containerStyle,
        isKeyboardVisible && styles.containerKeyboard,
        !isKeyboardVisible && {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <Button
        title={title}
        onPress={onPress}
        isDisabled={isDisabled}
        containerStyle={[
          buttonStyle,
          isKeyboardVisible && buttonStyleOnKeyboard,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  containerKeyboard: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
});
