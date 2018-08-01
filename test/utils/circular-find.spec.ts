import { circularFind } from './../../src/utils';

describe('circular-find', () => {
  const mock: string[] = ['position_1', 'position_2'];

  it(`should return the value of index 0`, () => {
    const result = circularFind(mock, 0);

    expect(result).toEqual('position_1');
  });

  it(`should return the value of index 0 because index 2 doesn't exists`, () => {
    const result = circularFind(mock, 2);

    expect(result).toEqual('position_1');
  });
});
