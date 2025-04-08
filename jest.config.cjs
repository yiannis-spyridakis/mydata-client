/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // Use ESM preset
  testEnvironment: 'node',
  moduleNameMapper: {
    // Handle module aliases (if any) and ensure '.js' extension resolution for ESM
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    // Use ts-jest for .ts files
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true // Enable ESM support
      }
    ]
  },
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ESM
  testMatch: ['**/tests/**/*.test.ts'] // Look for tests in the tests directory
};
