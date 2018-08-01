import { Styles } from './options-types';

export type LegendData = Partial<{
  labels: string[];
  colors: string[];
  type: 'horizontal' | 'vertical';
  styles: Styles;
}>;
