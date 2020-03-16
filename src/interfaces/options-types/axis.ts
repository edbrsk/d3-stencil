import { Formats } from './../formats';

export type Axis = {
  x?: {
    visible?: boolean;
    gridVisible?: boolean;
    format?: Formats;
    label?: string;
    currency?: string;
  };
  y?: {
    visible?: boolean;
    gridVisible?: boolean;
    format?: Formats;
    label?: string;
    currency?: string;
  };
};
