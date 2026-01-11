import { Pressable, View } from 'react-native';
import { Typo } from './Typo';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
}

export const Button = ({ title, onPress, isDisabled }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={isDisabled}>
      <View
        style={{
          height: 48,
          backgroundColor: '#E3E6ED',
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typo.Body variant="body1" color="#ABAFBB">
          {title}
        </Typo.Body>
      </View>
    </Pressable>
  );
};
