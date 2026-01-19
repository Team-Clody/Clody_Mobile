import { Pressable, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from './Icon';
import { Typo } from './typo/Typo';

export interface HeaderProps {
  prefix?: React.ReactNode | boolean;
  title?: string;
  suffix?: React.ReactNode;
  style?: ViewStyle;
  onPressBack?: () => void;
}

export const Header = ({
  prefix,
  title,
  suffix,
  style,
  onPressBack,
}: HeaderProps) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          width: '100%',
          paddingHorizontal: 12,
          paddingTop: 16,
          height: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFF',
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        {prefix === true ? (
          <Pressable onPress={handleBack}>
            <Icon.IcBack width={28} height={28} />
          </Pressable>
        ) : (
          prefix
        )}
      </View>

      <View style={{ flex: 0.6 }}>
        {title && (
          <Typo.Display variant="display4" style={{ textAlign: 'center' }}>
            {title}
          </Typo.Display>
        )}
      </View>

      <View
        style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        {suffix}
      </View>
    </View>
  );
};
