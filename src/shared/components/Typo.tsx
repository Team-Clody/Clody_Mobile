import { Body } from './Body';
import { Caption } from './Caption';
import { Display } from './Display';
import { Head } from './Head';
import { TypoBase } from './TypoBase';

export interface CompositionMetadata {
  Display: typeof Display;
  Head: typeof Head;
  Body: typeof Body;
  Caption: typeof Caption;
}

export const Typo = TypoBase as typeof TypoBase & CompositionMetadata;

Typo.Display = Display;
Typo.Head = Head;
Typo.Body = Body;
Typo.Caption = Caption;
