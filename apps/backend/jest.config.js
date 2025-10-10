import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const swcJestConfig = JSON.parse(readFileSync(`${__dirname}/.spec.swcrc`, 'utf-8'));

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

export default {
  transformIgnorePatterns: [
    '/node_modules/(?!chalk).+\\.js$', //fix compat chalk 5 in jest, Adjust regex to include 'chalk'
  ],
  displayName: '@shop/backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
  moduleNameMapper: {
    '^@transformers$': `<rootDir>/src/shared/transformers`,
    '^@filters$': '<rootDir>src/shared/filters',
    '^@interceptors$': '<rootDir>src/shared/interceptors',
    '^@types$': '<rootDir>src/shared/types',
    '^@prismax$': '<rootDir>src/prisma/client',
    '^@prismax$/(.*)$': 'src<rootDir>/prisma/client/$1',
    '^@services$': '<rootDir>src/shared/services',
    '^@constants$': '<rootDir>src/shared/constants',
    '^@utils$': '<rootDir>src/shared/utils',
    '^@loggers$': '<rootDir>src/shared/loggers',
    '^@decorators$': '<rootDir>src/shared/decorators',
    '^@guards$': `<rootDir>src/shared/guards`,
  },
};
