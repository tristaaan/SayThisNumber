import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'say',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      eslint(),
      commonjs()
    ]
  },
  {
    input: './src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  { // for testing
    input: './src/errors.js',
    output: [
      { file: './test/errors.js', format: 'cjs' }
    ]
  }
];
