import { IDomainService } from "@modules/shared";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";
import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import { CreateSingleCalculationDto } from "@modules/transaction/domain/services/create-single-calculation.domain-service";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import { CurrencyValueObject, DomainId } from "types-ddd";
import transactionMockRepo from "@modules/transaction/application/mocks/transaction-repo.mock";
import PostingToBenefitDto from "./posting-to-benefit.dto";
import PostingToBenefitUseCase from "./posting-to-benefit.use-case";

describe('posting-to-benefit.use-case', () => {

	let fakeDomainService: IDomainService<CreateSingleCalculationDto, TransactionCalculationValueObject> = {
		execute: jest.fn()
	};

	let fakeRepo: ITransactionRepository = transactionMockRepo;

	let useCase = new PostingToBenefitUseCase(fakeRepo, fakeDomainService);

	let validDto: PostingToBenefitDto = {
		budgetBoxId: 'valid_id',
		paymentDate: new Date('2020-01-01 00:00:00'),
		reason: 'valid_id',
		status: 'PENDENTE',
		total: 100,
		userId: 'valid_id',
	};

	let transaction = TransactionCalculationValueObject.create({
		budgetBoxId: DomainId.create(),
		budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid').getResult(),
		currency: CurrencyValueObject.create({ value: 100, currency: 'BRL' }).getResult()
	}).getResult();

	beforeEach(() => {
		fakeDomainService = {
			execute: jest.fn()
		};
	
		fakeRepo = transactionMockRepo;
	
		useCase = new PostingToBenefitUseCase(fakeRepo, fakeDomainService);
	
		validDto = {
			budgetBoxId: 'valid_id',
			paymentDate: new Date('2020-01-01 00:00:00'),
			reason: 'valid_id',
			status: 'PENDENTE',
			total: 100,
			userId: 'valid_id',
		};
	
		transaction = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create(),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: 'BRL' }).getResult()
		}).getResult();

		jest.spyOn(fakeRepo, 'save').mockClear();
	});

	it('should create a valid transaction with success', async () => {

		const saveSpy = jest.spyOn(fakeRepo, 'save');

		jest.spyOn(fakeDomainService, 'execute').mockResolvedValueOnce(transaction);

		const result = await useCase.execute(validDto);

		expect(result.isSuccess).toBeTruthy();
		expect(saveSpy).toHaveBeenCalled();
	});

	it('should fails if some value object is invalid', async () => {

		const saveSpy = jest.spyOn(fakeRepo, 'save');

		jest.spyOn(fakeDomainService, 'execute').mockResolvedValueOnce(transaction);

		const result = await useCase.execute({...validDto, status: 'INVALID' as any });

		expect(result.isFailure).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should fails none transaction were provided', async () => {

		const saveSpy = jest.spyOn(fakeRepo, 'save');

		jest.spyOn(fakeDomainService, 'execute').mockResolvedValueOnce(undefined as any);

		const result = await useCase.execute(validDto);

		expect(result.isFailure).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should fails if repository throws', async () => {

		jest.spyOn(fakeDomainService, 'execute').mockResolvedValueOnce(transaction);

		jest.spyOn(fakeRepo, 'save').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		jest.spyOn(fakeDomainService, 'execute').mockResolvedValueOnce(undefined as any);

		const result = await useCase.execute(validDto);

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(500);
	});
});
