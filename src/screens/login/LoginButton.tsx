import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Typo } from '../../shared/components/Typo';

type LoginButtonProps = {
  backgroundColor: string;
  icon: any;
  textColor: string;
  text: string;
  onPress?: () => void;
};

export const LoginButton = ({
  backgroundColor,
  icon,
  textColor,
  text,
  onPress,
}: LoginButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.loginButton, { backgroundColor }]}
    >
      <Image
        style={{ width: 16, height: 16 }}
        source={icon}
        resizeMode="contain"
      />
      <Typo.Body variant="body2" color={textColor} style={{ marginLeft: 8 }}>
        {text}
      </Typo.Body>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
    paddingVertical: 14,
    marginVertical: 5,
  },
});
