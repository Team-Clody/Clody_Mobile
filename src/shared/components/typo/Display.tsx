import { typography } from '../../theme/typography';
import { TypoBase, type TypoBaseProps } from './TypoBase';

interface DisplayProps extends TypoBaseProps {
  variant: Extract<
    keyof typeof typography,
    'display1' | 'display2' | 'display3' | 'display4'
  >;
}

export const Display = (props: DisplayProps) => {
  const { variant, children, style, ...rest } = props;

  return (
    <TypoBase variant={variant} style={[style]} {...rest}>
      {children}
    </TypoBase>
  );
};

