const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: {
    alias: {
      '@filters': join(__dirname, 'src/shared/filters'),
      '@interceptors': join(__dirname, 'src/shared/interceptors'),
      '@types': join(__dirname, 'src/shared/types'),
      '@services': join(__dirname, 'src/shared/services'),
      '@utils': join(__dirname, 'src/shared/utils'),
      '@transformers': join(__dirname, 'src/shared/transformers'),
      '@loggers': join(__dirname, 'src/shared/loggers'),
      '@constants': join(__dirname, 'src/shared/constants'),
      '@decorators': join(__dirname, 'src/shared/decorators'),
      '@guards': join(__dirname, 'src/shared/guards'),
      '@prismax': join(__dirname, 'src/prisma/client'),
      '@prismax/*': join(__dirname, 'src/prisma/client/*'),
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ]
};
