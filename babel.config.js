module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          '@components': './app/javascript/components',
          '@redux': './app/javascript/redux',
          '@routes': './app/javascript/routes',
          '@services': './app/javascript/services',
        }
      }
    ],
    'jest-hoist'
  ]
};