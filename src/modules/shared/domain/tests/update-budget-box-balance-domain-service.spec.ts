import { CURRENCY } from "@config/env";
import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { CurrencyValueObject, DomainId } from "types-ddd";
import { IBudgetBoxConnection } from "@shared/domain/budget-box-connection.interface";
import UpdateBudgetBoxBalanceDomainService,
{ UpdateBudgetBoxBalanceDto } from "@shared/domain/update-budget-box-balance.domain-service";

describe('update-budget-box-balance.domain-service', () => {

	let fakeConnection: IBudgetBoxConnection;

	beforeEach(() => {
		fakeConnection = {
			findBudgetBoxByIdAndUserId: jest.fn(),
			findBudgetBoxesByUserId: jest.fn(),
			getBudgetBoxesByIds: jest.fn(),
			updateBudgetBoxesBalance: jest.fn(),
		};
	});

	it('should sum and update documents with success', async () => {

		const data = [10, 20, 30, 40].map((value) => (
			{
				value: CurrencyValueObject.create({ currency: CURRENCY, value }).getResult(),
				budgetBoxId: DomainId.create(`id-${value}`)
			}
		));

		const models = data.map((model) => ({
			id: model.budgetBoxId.uid,
			balanceAvailable: model.value.value
		}));

		const expectedModels = models.map((model) => ({
			id: model.id,
			balanceAvailable: model.balanceAvailable + model.balanceAvailable
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUM',
			budgetBoxes: data
		};

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(true);

		const result = await service.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(models).toEqual(expectedModels);
	});

	it('should subtract and update documents with success', async () => {

		const data = [10, 20, 30, 40].map((value) => (
			{
				value: CurrencyValueObject.create({ currency: CURRENCY, value }).getResult(),
				budgetBoxId: DomainId.create(`id-${value}`)
			}
		));

		const models = data.map((model) => ({
			id: model.budgetBoxId.uid,
			balanceAvailable: model.value.value
		}));

		const expectedModels = models.map((model) => ({
			id: model.id,
			balanceAvailable: model.balanceAvailable - model.balanceAvailable
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUBTRACT',
			budgetBoxes: data
		};

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(true);

		const result = await service.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(models).toEqual(expectedModels);
	});

	it('fails if connection throws', async () => {

		const data = [10, 20, 30, 40].map((value) => (
			{
				value: CurrencyValueObject.create({ currency: CURRENCY, value }).getResult(),
				budgetBoxId: DomainId.create(`id-${value}`)
			}
		));

		const models = data.map((model) => ({
			id: model.budgetBoxId.uid,
			balanceAvailable: model.value.value
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUBTRACT',
			budgetBoxes: data
		};

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(false);

		const result = await service.execute(dto);
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Error On Update Budget Box Balance Domain Service');
	});

	it('fails if connection throws', async () => {


		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUBTRACT',
			budgetBoxes: []
		};

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const result = await service.execute(dto);
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error: error');
	});
});
