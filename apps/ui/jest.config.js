module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    // Handle absolute imports in Remix
    '~/(.*)': '<rootDir>/app/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.cache/', '<rootDir>/build/'],
  transform: {
    // Use @swc/jest to transpile tests
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
}
