module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/test/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@root/(.*)': '<rootDir>/src/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@shared-core/(.*)': '<rootDir>/src/domain/shared/core/$1',
    '@shared-common/(.*)': '<rootDir>/src/domain/shared/common/$1',
    '@shared/(.*)': '<rootDir>/src/domain/shared/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
  },
};
