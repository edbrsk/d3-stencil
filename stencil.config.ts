import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'd3-stencil',
  outputTargets: [{type: 'dist'}, {type: 'www'}],
  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/objects.scss']
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
