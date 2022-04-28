import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import transactionMockRepo from "@modules/transaction/application/mocks/transaction-repo.mock";
import { IDomainService } from "@modules/shared";
import {
	CreateSingleCalculationDto
} from "@modules/transaction/domain/services/create-single-calculation.domain-service";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import BalanceTransferenceUseCase from "./balance-transference.use-case";
import { CurrencyValueObject, DomainId } from "types-ddd";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";
import { CURRENCY } from "@config/env";

describe('balance-transference.use-case.ts', () => {

	let repository: ITransactionRepository;
	let service: IDomainService<CreateSingleCalculationDto, TransactionCalculationValueObject>;

	beforeEach(() => {
		repository = transactionMockRepo;
		service = {
			execute: jest.fn()
		};
		jest.spyOn(repository, 'save').mockClear();
		jest.spyOn(service, 'execute').mockClear();
	});

	it('should transfer balance with success', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: CURRENCY }).getResult()
		}).getResult();

		const repositorySpy = jest.spyOn(repository, 'save');
		jest.spyOn(service, 'execute').mockResolvedValue(calculation);
		
		const useCase = new BalanceTransferenceUseCase(repository, service);


		const result = await useCase.execute({
			destinationBoxId: 'valid_destination_id',
			reason: 'valid_reason',
			sourceBoxId: 'valid_source_id',
			userId: 'valid_user_id',
			total: 200
		});

		expect(result.isSuccess).toBeTruthy();

		expect(repositorySpy).toHaveBeenCalledTimes(2);

	});

	it('should fail if provide an invalid reason', async () => {

		const repositorySpy = jest.spyOn(repository, 'save');

		const useCase = new BalanceTransferenceUseCase(repository, service);
		
		const invalidReason = 'invalid_reason'.repeat(10);

		const result = await useCase.execute({
			destinationBoxId: 'valid_destination_id',
			reason: invalidReason,
			sourceBoxId: 'valid_source_id',
			userId: 'valid_user_id',
			total: 200
		});
		
		expect(result.isFailure).toBeTruthy();

		expect(result.error).toBe('Invalid reason description length, must have min 3 and max 50 characters');

		expect(repositorySpy).not.toHaveBeenCalled();

	});

	it('should fails if not provide transactions', async () => {

		const repositorySpy = jest.spyOn(repository, 'save');
		jest.spyOn(service, 'execute').mockResolvedValueOnce(undefined as any);

		const useCase = new BalanceTransferenceUseCase(repository, service);

		const result = await useCase.execute({
			destinationBoxId: 'valid_destination_id',
			reason: 'valid_reason',
			sourceBoxId: 'valid_source_id',
			userId: 'valid_user_id',
			total: 200
		});

		expect(result.isFailure).toBeTruthy();

		expect(repositorySpy).not.toHaveBeenCalled();

	});


	it('should fails if repository throws', async () => {

		const repositorySpy = jest.spyOn(repository, 'save');
		jest.spyOn(service, 'execute').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new BalanceTransferenceUseCase(repository, service);

		const result = await useCase.execute({
			destinationBoxId: 'valid_destination_id',
			reason: 'valid_reason',
			sourceBoxId: 'valid_source_id',
			userId: 'valid_user_id',
			total: 200
		});

		expect(result.isFailure).toBeTruthy();

		expect(repositorySpy).not.toHaveBeenCalled();

	});

	it('should fails if provide long description as note', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: CURRENCY }).getResult()
		}).getResult();

		const repositorySpy = jest.spyOn(repository, 'save');
		jest.spyOn(service, 'execute').mockResolvedValue(calculation);
		
		const useCase = new BalanceTransferenceUseCase(repository, service);

		const invalidNote = 'invalid_note_description'.repeat(50);

		const result = await useCase.execute({
			destinationBoxId: 'valid_destination_id',
			reason: 'valid_reason',
			sourceBoxId: 'valid_source_id',
			userId: 'valid_user_id',
			total: 200,
			note: invalidNote
		});

		expect(result.isFailure).toBeTruthy();

		expect(repositorySpy).not.toHaveBeenCalledTimes(2);

	});

	it('should fails if provide an invalid attachment url', async () => {

		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_id'),
			budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
			currency: CurrencyValueObject.create({ value: 100, currency: CURRENCY }).getResult()
		}).getResult();

		const repositorySpy = jest.spyOn(repository, 'save');
		jest.spyOn(service, 'execute').mockResolvedValue(calculation);
		
		const useCase = new BalanceTransferenceUseCase(repository, service);

		const invalidAttach = 'invalid_attach'.repeat(50);

		const result = await useCase.execute({
			destinationBoxId: 'valid_destination_id',
			reason: 'valid_reason',
			sourceBoxId: 'valid_source_id',
			userId: 'valid_user_id',
			total: 200,
			attachment: invalidAttach
		});

		expect(result.isFailure).toBeTruthy();

		expect(repositorySpy).not.toHaveBeenCalledTimes(2);

	});
});
