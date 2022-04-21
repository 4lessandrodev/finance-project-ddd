process.env.TZ = 'UTC';

module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: [
		'<rootDir>/src/modules/**/*.ts',
		'!<rootDir>/src/modules/**/infra/*.ts',
		'!<rootDir>/src/modules/**/infra/**/*.ts',
		'!<rootDir>/src/main/**',
		'!<rootDir>/src/modules/**/domain/tests/mock/**/*.ts',
		'!<rootDir>/src/modules/**/application/use-cases/**/*.dto.ts',
		'!**/test/**',
	],
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	testRegex: [".+\\.spec\\.ts$"],
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
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