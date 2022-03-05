process.env.TZ = 'UTC';

module.exports = {
	testTimeout: 9000,
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
	testRegex: [".+\\.test\\.ts$"],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1',
		'@root/(.*)': '<rootDir>/src/$1',
		'@modules/(.*)': '<rootDir>/src/modules/$1',
		'@shared/(.*)': '<rootDir>/src/modules/shared/$1',
		'@shared-common/(.*)': '<rootDir>/src/modules/shared/common/$1',
		'@config/(.*)': '<rootDir>/src/config/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
		'@app/(.*)': '<rootDir>/src/$1',
	},
};