import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderProps } from './Header';

interface SectionPageProps {
  containerStyle?: ViewStyle;
  contentsStyle?: ViewStyle;
  header?: HeaderProps | boolean;
  children?: React.ReactNode;
  safeAreaBackgroundColor?: string;
}

export const SectionPage = ({
  containerStyle,
  contentsStyle,
  header,
  children,
  safeAreaBackgroundColor = '#FFF',
}: SectionPageProps) => {
  const renderHeader = header ? (
    typeof header === 'object' ? (
      <Header {...header} />
    ) : (
      <Header prefix={true} />
    )
  ) : null;

  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: safeAreaBackgroundColor }}
      />
      <View style={[{ flex: 1, backgroundColor: '#FFF' }, containerStyle]}>
        {renderHeader}
        <View
          style={[
            {
              flex: 1,
              marginTop: header ? 32 : 0,
            },
            contentsStyle,
          ]}
        >
          {children}
        </View>
      </View>
    </>
  );
};
