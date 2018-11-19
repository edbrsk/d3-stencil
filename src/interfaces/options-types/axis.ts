import { Formats } from './../formats';

export type Axis = Partial<{
  x: Partial<{
    visible: boolean;
    gridVisible: boolean;
    format: Formats;
    label: string;
    currency: string;
  }>;
  y: Partial<{
    visible: boolean;
    gridVisible: boolean;
    format: Formats;
    label: string;
    currency: string;
  }>;
}>;
