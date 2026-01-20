import { typography } from '../../theme/typography';
import { TypoBase, type TypoBaseProps } from './TypoBase';

interface HeadProps extends TypoBaseProps {
  variant: Extract<keyof typeof typography, 'head1' | 'head2'>;
}

export const Head = (props: HeadProps) => {
  const { variant, children, style, ...rest } = props;

  return (
    <TypoBase variant={variant} style={[style]} {...rest}>
      {children}
    </TypoBase>
  );
};

