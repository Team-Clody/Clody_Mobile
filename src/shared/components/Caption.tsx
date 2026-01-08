import { typography } from '../theme/typography';
import { TypoBase, type TypoBaseProps } from './TypoBase';

interface CaptionProps extends TypoBaseProps {
  variant: Extract<
    keyof typeof typography,
    'caption1' | 'caption2' | 'caption3'
  >;
}

export const Caption = (props: CaptionProps) => {
  const { variant, children, style, ...rest } = props;

  return (
    <TypoBase variant={variant} style={[style]} {...rest}>
      {children}
    </TypoBase>
  );
};
