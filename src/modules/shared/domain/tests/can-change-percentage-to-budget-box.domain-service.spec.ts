import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { IBudgetBoxConnection } from "../budget-box-connection.interface";
import CanChangeBudgetBoxPercentageDomainService from "../can-change-budget-box-percentage.domain-service";

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

	it('should return cannot change if budget box is not found', async () => {

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce([]);

		const domainService = new CanChangeBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id', budgetPercentage: 100, budgetBoxId: 'invalid_id'
		});

		expect(result.isFailure).toBeTruthy();
	});

	it('should can allocate if total sum is less or equal to 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(10), noPercentage(), withPercentage(20)];

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const domainService = new CanChangeBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id', budgetPercentage: 70, budgetBoxId: 'valid_id'
		});

		expect(result.isSuccess).toBeTruthy();
	});

	it('should can allocate if total sum is less than 100', async () => {

		const { withPercentage, noPercentage } = makeBudgetBox;

		const data: IBudgetBox[] = [withPercentage(50), noPercentage(), withPercentage(50)];

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const domainService = new CanChangeBudgetBoxPercentageDomainService(fakeConnection);
		const result = await domainService.execute({
			ownerId: 'valid_user_id', budgetPercentage: 100, budgetBoxId: 'valid_id'
		});

		expect(result.isFailure).toBeTruthy();
	});

});
