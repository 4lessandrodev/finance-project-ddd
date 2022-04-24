import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import CanAllocateToBudgetBoxPercentageDomainService from "../can-allocate-percentage-to-budget-box.domain-service";
import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";

describe('can-allocate-percentage-to-budget-box.domain-service', () => {
	const currentDate = new Date('2022-01-01 00:00:00');

	const data: IBudgetBox = {
		id: 'valid_id',
		balanceAvailable: {
			value: 100,
			currency: 'BRL'
		},
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

	const fakeConnection: IBudgetBoxQueryService = {
		getBudgetBoxByIdAndOwnerId: jest.fn(),
		getBudgetBoxesByOwnerId: jest.fn()
	};

	it('should return can allocate 100 if none budget-boxes were found', async () => {

		jest.spyOn(fakeConnection, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce([]);

		const domainService = new CanAllocateToBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id',
			budgetPercentage: 100,
			isPercentage: true
		});

		expect(result.getResult()).toBeTruthy();
	});

	it('should cannot allocate if total sum is greater than 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce(data);

		const domainService = new CanAllocateToBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id',
			budgetPercentage: 80,
			isPercentage: true
		});

		expect(result.getResult()).toBeFalsy();
	});

	it('should can allocate if total sum is less than 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce(data);

		const domainService = new CanAllocateToBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id',
			budgetPercentage: 65,
			isPercentage: true
		});

		expect(result.getResult()).toBeTruthy();
	});

	it('should can allocate if total sum is equal to 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce(data);

		const domainService = new CanAllocateToBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id',
			budgetPercentage: 70,
			isPercentage: true
		});

		expect(result.getResult()).toBeTruthy();
	});

	it('should can allocate if not percentage', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce(data);

		const domainService = new CanAllocateToBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id',
			budgetPercentage: 100,
			isPercentage: false
		});

		expect(result.getResult()).toBeTruthy();
	});
});
