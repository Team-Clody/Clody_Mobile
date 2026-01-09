import { useMemo } from 'react';
import {
  Text as RNText,
  type TextProps as RNTextProps,
  TextPropsIOS,
} from 'react-native';
import { typography } from '../theme/typography';
import { palette } from '../theme/palette';

type TypographyVariant = keyof typeof typography;

export interface TypoBaseProps extends RNTextProps {
  color?: string;
  variant?: TypographyVariant;
  center?: boolean;
  stroke?: boolean;
  underline?: boolean;
  lineBreakStrategyIOS?: TextPropsIOS['lineBreakStrategyIOS'];
  lineHeight?: number;
}

export const TypoBase = (props: TypoBaseProps) => {
  const {
    children,
    color,
    style,
    variant = 'body1',
    center,
    stroke,
    underline,
    lineBreakStrategyIOS = 'hangul-word',
    lineHeight,
    ...rest
  } = props;

  const textColor = useMemo(() => {
    if (color && Object.keys(palette).includes(color)) {
      return palette[color as keyof typeof palette];
    }
    return color || palette.gray1000;
  }, [color]);

  const variantStyles = variant && typography[variant];
  const overideLineHeight = lineHeight
    ? {
        lineHeight: variantStyles.fontSize * lineHeight + 0.01,
      }
    : {};

  return (
    <RNText
      lineBreakStrategyIOS={lineBreakStrategyIOS}
      allowFontScaling={false}
      style={[
        {
          color: textColor,
          textAlign: center ? 'center' : 'left',
          textDecorationLine: underline ? 'underline' : 'none',
        },
        stroke && { textDecorationLine: 'line-through' },
        style,
        variantStyles,
        overideLineHeight,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
