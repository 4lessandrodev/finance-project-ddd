import { IDomainService } from "@modules/shared";
import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import { PercentageCalculationDomainServiceDto } from "@modules/transaction/domain/services/create-percentage-transaction-calculation.domain-service";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import PercentageCapitalInflowPostingUseCase from "./percentage-capital-inflow-posting.use-case";
import Dto from "./percentage-capital-inflow-posting.dto";
import { CurrencyValueObject, DomainId } from "types-ddd";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";
import transactionMockRepo from "@modules/transaction/application/mocks/transaction-repo.mock";

describe('percentage-capital-inflow-posting.use-case', () => {

	let fakeService: IDomainService<PercentageCalculationDomainServiceDto, TransactionCalculationValueObject[]>;
	let fakeRepo: ITransactionRepository;

	beforeEach(() => {
		fakeService = {
			execute: jest.fn()
		};
		
		fakeRepo = transactionMockRepo;
		jest.spyOn(fakeRepo, 'save').mockClear();
	});

	const validDto:Dto = {
		reason: 'valid_reason',
		status: 'CONCLUIDO',
		total: 100,
		userId: 'valid_id',
		attachment: 'https://bucket.s3-app.amazonaws.com/attach.pdf',
		note: 'valid_note',
		paymentDate: new Date('2020-01-01 00:00:00')
	};

	it('should fails if calculation is not provided', async () => {

		jest.spyOn(fakeService, 'execute').mockResolvedValueOnce([]);
		const saveSpy = jest.spyOn(fakeRepo, 'save');

		const useCase = new PercentageCapitalInflowPostingUseCase(fakeRepo, fakeService);

		const result = await useCase.execute(validDto);
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Calculation is required');
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should create a valid transaction with success', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: 'BRL' }).getResult()
		}).getResult();

		jest.spyOn(fakeService, 'execute').mockResolvedValueOnce([calculation]);
		const saveSpy = jest.spyOn(fakeRepo, 'save');

		const useCase = new PercentageCapitalInflowPostingUseCase(fakeRepo, fakeService);

		const result = await useCase.execute(validDto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalled();
	});

	it('should do not apply attachment and note if not provide them', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: 'BRL' }).getResult()
		}).getResult();

		jest.spyOn(fakeService, 'execute').mockResolvedValueOnce([calculation]);
		const saveSpy = jest.spyOn(fakeRepo, 'save');

		const useCase = new PercentageCapitalInflowPostingUseCase(fakeRepo, fakeService);

		const dto = { ...validDto, attachment: undefined, note: undefined };
		
		const result = await useCase.execute(dto);
		
		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalled();
	});

	it('should fails if provide an invalid status', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: 'BRL' }).getResult()
		}).getResult();

		const invalidDto = { ...validDto, status: 'INVALID' };

		jest.spyOn(fakeService, 'execute').mockResolvedValueOnce([calculation]);
		const saveSpy = jest.spyOn(fakeRepo, 'save');

		const useCase = new PercentageCapitalInflowPostingUseCase(fakeRepo, fakeService);

		const result = await useCase.execute(invalidDto as any);
		
		expect(result.isFailure).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should fails if repository throws', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: 'BRL' }).getResult()
		}).getResult();

		jest.spyOn(fakeService, 'execute').mockResolvedValueOnce([calculation]);
		jest.spyOn(fakeRepo, 'save').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new PercentageCapitalInflowPostingUseCase(fakeRepo, fakeService);

		const result = await useCase.execute(validDto);
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On Percentage Capital Inflow Posting Use Case');
		expect(result.statusCodeNumber).toBe(500);
	});
});
