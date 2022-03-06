import UserMock from "./user.mock";

describe('user.mock', () => {
	
	const userMock = new UserMock();

	it('should create a valid user model mock', () => {
		const model = userMock.model();

		expect(model).toBeDefined();
	});

	it('should create a valid user model mock with provided id', () => {
		const model = userMock.model({ id: 'provided_id' });

		expect(model.id).toBe('provided_id');
		expect(model).toMatchSnapshot();
	});

	it('should create a valid user aggregate mock with provided id', () => {
		const domain = userMock.domain({ id: 'provided_id' });


		expect(domain.isSuccess).toBeTruthy();
		expect(domain.getResult().id.uid).toBe('provided_id');
		expect(domain).toMatchSnapshot();
	});

	it('should create a valid user aggregate mock', () => {
		const domain = userMock.domain();

		expect(domain.isSuccess).toBeTruthy();
	});
});
