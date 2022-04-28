import { CURRENCY } from "@config/env";
import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { CurrencyValueObject, DomainId } from "types-ddd";
import { IBudgetBoxConnection } from "@shared/domain/budget-box-connection.interface";
import UpdateBudgetBoxBalanceDomainService,
{ UpdateBudgetBoxBalanceDto } from "@shared/domain/update-budget-box-balance.domain-service";
import budgetBoxConnectionMock from "./mocks/budget-box-connection.mock";
import CalculateValueToUpdate from "@modules/shared/utils/calculate";

describe('update-budget-box-balance.domain-service', () => {

	let fakeConnection: IBudgetBoxConnection;
	const calculator = new CalculateValueToUpdate();

	beforeEach(() => {
		fakeConnection = budgetBoxConnectionMock;
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockClear();
		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockClear();
	});

	it('fails as internal server error if connection throws', async () => {

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUBTRACT',
			budgetBoxes: []
		};

		const result = await service.execute(dto);

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error: error');
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
			balanceAvailable: {
				currency: 'BRL',
				value: model.value.value,
			}
		}));

		const expectedModels = models.map((model) => ({
			id: model.id,
			balanceAvailable: {
				currency: CURRENCY,
				value: model.balanceAvailable.value + model.balanceAvailable.value,
			}
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUM',
			budgetBoxes: data
		};

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		const saveSpy = jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance');
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(true);

		const result = await service.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalledWith(expectedModels);
	});

	it('should return model if it does not exists', async () => {

		const makeObject = (value: number) => ({
			value: CurrencyValueObject.create({ currency: CURRENCY, value }).getResult(),
			budgetBoxId: DomainId.create(`id-${value}`)
		});

		const data = [10, 20, 30, 40].map((value) => (makeObject(value)));

		const models = data.map((model) => ({
			id: model.budgetBoxId.uid,
			balanceAvailable: {
				currency: CURRENCY,
				value: model.value.value,
			}
		}));
		
		data.unshift(makeObject(1));

		const expectedModels = models.map((model) => ({
			id: model.id,
			balanceAvailable: {
				currency: CURRENCY,
				value: model.balanceAvailable.value + model.balanceAvailable.value,
			}
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUM',
			budgetBoxes: data
		};

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		const saveSpy = jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance');
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(true);

		const result = await service.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalledWith(expectedModels);
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
			balanceAvailable: {
				value: model.value.value,
				currency: CURRENCY
			}
		}));

		const expectedModels = models.map((model) => ({
			id: model.id,
			balanceAvailable: {
				value: model.balanceAvailable.value - model.balanceAvailable.value,
				currency: CURRENCY
			}
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUBTRACT',
			budgetBoxes: data
		};
		const saveSpy = jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance');
		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(true);

		const result = await service.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalledWith(expectedModels);
	});

	it('should call save with the same value if provide an invalid operation type', async () => {

		const data = [10, 20, 30, 40].map((value) => (
			{
				value: CurrencyValueObject.create({ currency: CURRENCY, value }).getResult(),
				budgetBoxId: DomainId.create(`id-${value}`)
			}
		));

		const models = data.map((model) => ({
			id: model.budgetBoxId.uid,
			balanceAvailable: {
				value: model.value.value,
				currency: CURRENCY
			}
		}));

		const expectedModels = models.map((model) => ({
			id: model.id,
			balanceAvailable: {
				value: model.balanceAvailable.value,
				currency: CURRENCY
			}
		}));

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'INVALID' as any,
			budgetBoxes: data
		};
		const saveSpy = jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance');
		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(true);

		const result = await service.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalledWith(expectedModels);
	});

	it('should do none operation if provide NONE token', async () => {

		const saveSpy = jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance');
		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce([] as IBudgetBox[]);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'NONE',
			budgetBoxes: []
		};

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);
		const result = await service.execute(dto);

		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('fails with service unavailable if connection throws', async () => {

		const data = [10, 20, 30, 40].map((value) => (
			{
				value: CurrencyValueObject.create({ currency: CURRENCY, value }).getResult(),
				budgetBoxId: DomainId.create(`id-${value}`)
			}
		));

		const models = data.map((model) => ({
			id: model.budgetBoxId.uid,
			balanceAvailable: {
				value: model.value.value,
				currency: CURRENCY
			}
		}));

		jest.spyOn(fakeConnection, 'getBudgetBoxesByIds').mockResolvedValueOnce(models as IBudgetBox[]);
		jest.spyOn(fakeConnection, 'updateBudgetBoxesBalance').mockResolvedValueOnce(false);

		const service = new UpdateBudgetBoxBalanceDomainService(fakeConnection,calculator);

		const dto: UpdateBudgetBoxBalanceDto = {
			operationType: 'SUBTRACT',
			budgetBoxes: data
		};


		const result = await service.execute(dto);
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Error On Update Budget Box Balance Domain Service');
	});
});
