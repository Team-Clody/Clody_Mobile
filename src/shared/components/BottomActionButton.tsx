import { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  StyleProp,
  StyleSheet,
  View,
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

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () =>
      setIsKeyboardVisible(true),
    );
    const hideSubscription = Keyboard.addListener(hideEvent, () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View
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
    </View>
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
