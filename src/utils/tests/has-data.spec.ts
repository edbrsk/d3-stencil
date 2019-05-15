import { GraphData } from '../../interfaces';
import {
  hasDataIsNotEmpty,
  hasDataValidOnAnnotationsChart,
  hasDataBCGMatrixIsNotEmpty,
} from '../';

describe('has-data:', () => {
  const errorMessage = /^The data injected isn't valid./;
  const validGraphDataMerged: GraphData<any[]> = {
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    styles: null,
    lineAnnotationsChart: {
      increaseHeight: 100,
      tickSeparation: '2em',
      annotations: [],
      imagePathOneAnnotation: 'one_annotation',
      imagePathSomeAnnotations: 'some_annotations',
    },
    data: [[2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463]],
  };
  const invalidGraphDataMerged: GraphData<any[]> = {
    labels: [],
    styles: null,
    lineAnnotationsChart: {
      increaseHeight: 0,
      tickSeparation: '',
      annotations: [],
      imagePathOneAnnotation: '',
      imagePathSomeAnnotations: '',
    },
    data: [],
  };

  describe('hasDataIsNotEmpty', () => {
    it('should return true with correct parameters', () => {
      const result = hasDataIsNotEmpty(validGraphDataMerged);
      expect(result).toBeTruthy();
    });

    it(`should throw an Error, because the data isn't valid`, () => {
      expect(() => hasDataIsNotEmpty(invalidGraphDataMerged)).toThrowError(
        errorMessage,
      );
    });
  });

  describe('hasDataValidOnAnnotationsChart', () => {
    it('should return true with correct parameters', () => {
      const result = hasDataValidOnAnnotationsChart(validGraphDataMerged);
      expect(result).toBeTruthy();
    });

    it(`should throw an Error, because the data isn't valid`, () => {
      expect(() =>
        hasDataValidOnAnnotationsChart(invalidGraphDataMerged),
      ).toThrowError(errorMessage);
    });
  });

  describe('hasDataBCGMatrixIsNotEmpty', () => {
    it('should return true with correct parameters', () => {
      const result = hasDataBCGMatrixIsNotEmpty(validGraphDataMerged);
      expect(result).toBeTruthy();
    });

    it(`should throw an Error, because the data isn't valid`, () => {
      expect(() =>
        hasDataBCGMatrixIsNotEmpty(invalidGraphDataMerged),
      ).toThrowError(errorMessage);
    });
  });
});
