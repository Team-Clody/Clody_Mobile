import { typography } from '../theme/typography';
import { TypoBase, type TypoBaseProps } from './TypoBase';

interface BodyProps extends TypoBaseProps {
  variant: Extract<
    keyof typeof typography,
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'body5'
    | 'body6'
    | 'body7'
    | 'body8'
    | 'body9'
    | 'body10'
    | 'body11'
    | 'body12'
    | 'body13'
  >;
}

export const Body = (props: BodyProps) => {
  const { variant, children, style, ...rest } = props;

  return (
    <TypoBase variant={variant} style={[style]} {...rest}>
      {children}
    </TypoBase>
  );
};
