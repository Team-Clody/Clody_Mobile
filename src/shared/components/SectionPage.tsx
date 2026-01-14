import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Header, HeaderProps } from './Header';

interface SectionPageProps {
  containerStyle?: ViewStyle;
  contentsStyle?: ViewStyle;
  header?: HeaderProps | boolean;
  children?: React.ReactNode;
}

export const SectionPage = ({
  containerStyle,
  contentsStyle,
  header,
  children,
}: SectionPageProps) => {
  const renderHeader = header ? (
    typeof header === 'object' ? (
      <Header {...header} />
    ) : (
      <Header prefix={true} />
    )
  ) : null;

  return (
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
  );
};
