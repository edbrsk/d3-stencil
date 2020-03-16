import { Styles } from './options-types';

export type LegendData = {
  labels?: string[];
  colors?: string[];
  type?: 'horizontal' | 'vertical';
  styles?: Styles;
};
