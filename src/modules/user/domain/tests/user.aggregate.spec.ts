import UserMock from './mock/user.mock';

describe('user.aggregate', () => {

	const userMock = new UserMock();

	it('should create a valid user', () => {
		const user = userMock.domain();

		expect(user.isSuccess).toBe(true);
	});

	it('should get valid values', () => {
		const user = userMock.domain();

		const userResult = user.getResult();

		expect(userResult.id).toBeDefined();
		expect(userResult.createdAt).toBeDefined();
		expect(userResult.email.value).toBe('valid_email@domain.com');
		expect(userResult.isDeleted).toBeFalsy();
		expect(userResult.password.value).toBe('valid_password');
		expect(userResult.terms).toMatchSnapshot();
	});

	it('should create a valid user with provided id', () => {
		const user = userMock.domain({ id: 'valid_id' });

		expect(user.getResult().id.toValue()).toBe('valid_id');
	});
});
