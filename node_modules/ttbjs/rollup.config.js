import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: [
      'src/esm/index.js'
    ],
    output: {
      file: 'src/cjs/index.cjs',
      format: 'cjs'
  },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      })
    ]
  }
];
