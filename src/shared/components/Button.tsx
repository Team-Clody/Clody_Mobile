import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { Typo } from './Typo';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Button = ({
  title,
  onPress,
  isDisabled,
  containerStyle,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={isDisabled}>
      <View
        style={[
          {
            height: 48,
            backgroundColor: isDisabled ? '#E3E6ED' : '#293038',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
          },
          containerStyle,
        ]}
      >
        <Typo.Body variant="body1" color={isDisabled ? '#ABAFBB' : '#FFFFFF'}>
          {title}
        </Typo.Body>
      </View>
    </Pressable>
  );
};
