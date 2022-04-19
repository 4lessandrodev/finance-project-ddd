import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { IBudgetBoxConnection } from "../budget-box-connection.interface";
import CanAllocatePercentageToBudgetBoxDomainService from "../can-allocate-percentage-to-budget-box.domain-service";

describe('can-allocate-percentage-to-budget-box.domain-service', () => {
	const currentDate = new Date('2022-01-01 00:00:00');

	const data = {
		id: 'valid_id',
		balanceAvailable: 100,
		budgetPercentage: 10,
		createdAt: currentDate,
		description: 'valid_description',
		isPercentage: true,
		ownerId: 'valid_user_id',
		reasons: [],
		updatedAt: currentDate
	};

	const makeBudgetBox = {
		withPercentage: (budgetPercentage: number): IBudgetBox => ({ ...data, budgetPercentage }),
		noPercentage: (): IBudgetBox => ({ ...data, budgetPercentage: 100, isPercentage: false }),
	};

	const fakeConnection: IBudgetBoxConnection = {
		findBudgetBoxesByUserId: jest.fn()
	};

	it('should return can allocate 100 if none budget-boxes were found', async () => {

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce([]);

		const domainService = new CanAllocatePercentageToBudgetBoxDomainService(fakeConnection);
		const result = await domainService.execute({ ownerId: 'valid_user_id', budgetPercentage: 100 });

		expect(result.getResult()).toBeTruthy();
	});

	it('should cannot allocate if total sum is greater than 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const domainService = new CanAllocatePercentageToBudgetBoxDomainService(fakeConnection);
		const result = await domainService.execute({ ownerId: 'valid_user_id', budgetPercentage: 80 });

		expect(result.getResult()).toBeFalsy();
	});

	it('should can allocate if total sum is less than 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const domainService = new CanAllocatePercentageToBudgetBoxDomainService(fakeConnection);
		const result = await domainService.execute({ ownerId: 'valid_user_id', budgetPercentage: 65 });

		expect(result.getResult()).toBeTruthy();
	});

	it('should can allocate if total sum is equal to 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const domainService = new CanAllocatePercentageToBudgetBoxDomainService(fakeConnection);
		const result = await domainService.execute({ ownerId: 'valid_user_id', budgetPercentage: 70 });

		expect(result.getResult()).toBeTruthy();
	});
});
