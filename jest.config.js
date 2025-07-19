module.exports = {
  preset: 'jest-playwright-preset',
  roots: ['<rootDir>/tests/jest'],
  globalSetup: './framework/global-setup.ts',
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec).+(ts|js)'],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  }
};
