import { FormatsType } from './../formats';

export type Axis = Partial<{
  x: Partial<{
    visible: boolean;
    gridVisible: boolean;
    format: FormatsType;
    label: string;
    currency: string;
  }>;
  y: Partial<{
    visible: boolean;
    gridVisible: boolean;
    format: FormatsType;
    label: string;
    currency: string;
  }>;
}>;
