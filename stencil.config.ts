import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'd3-stencil',
  outputTargets: [{ type: 'dist' }, { type: 'www' }],
  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/objects.scss'],
    }),
  ],
  testing: {
    moduleNameMapper: {
      '@d3-stencil/decorators': '<rootDir>/src/decorators/index.ts',
      '@d3-stencil/interfaces': '<rootDir>/src/interfaces/index.ts',
      '@d3-stencil/shared': '<rootDir>/src/shared/index.ts',
      '@d3-stencil/utils': '<rootDir>/src/utils/index.ts',
    },
  },
};
