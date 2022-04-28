import { CURRENCY } from "@config/env";
import ReasonDescriptionValueObject from "@modules/budget-box/domain/reason-description.value-object";
import { IDomainService } from "@modules/shared";
import AttachmentPathValueObject from "@modules/transaction/domain/attachment-path.value-object";
import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import {
	CreateSingleCalculationDto
} from "@modules/transaction/domain/services/create-single-calculation.domain-service";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import TransactionNoteValueObject from "@modules/transaction/domain/transaction-note.value-object";
import TransactionStatusValueObject from "@modules/transaction/domain/transaction-status.value-object";
import TransactionTypeValueObject from "@modules/transaction/domain/transaction-type.value-object";
import TransactionAggregate from "@modules/transaction/domain/transaction.aggregate";
import { Inject } from "@nestjs/common";
import { ChangesObserver, CurrencyValueObject, DateValueObject, DomainId, IUseCase, Result } from "types-ddd";
import CreateExpenseDto from "./create-expense.dto";

export class CreateExpenseUseCase implements IUseCase<CreateExpenseDto, Result<void>>{

	constructor (
		@Inject('TransactionRepository')
		private readonly transactionRepo: ITransactionRepository,

		@Inject('CreateSingleCalculationDomainService')
		private readonly domainService: IDomainService<CreateSingleCalculationDto, TransactionCalculationValueObject>
	){}

	async execute (dto: CreateExpenseDto): Promise<Result<void, string>> {
		try {

			const ID = DomainId.create();
			const paymentDate = DateValueObject.create(dto.paymentDate);
			const reasonOrError = ReasonDescriptionValueObject.create(dto.reason);
			const statusOrError = TransactionStatusValueObject.create(dto.status);
			const transactionTypeOrError = TransactionTypeValueObject.create('SAIDA');
			const userId = DomainId.create(dto.userId);
			const attachmentOrError = dto.attachment && AttachmentPathValueObject.create(dto.attachment);
			const noteOrError = dto.note && TransactionNoteValueObject.create(dto.note);
			const totalValueOrError = CurrencyValueObject.create({ value: dto.total, currency: CURRENCY });

			const observer = ChangesObserver.init<unknown>();
			observer
				.add(paymentDate)
				.add(reasonOrError)
				.add(statusOrError)
				.add(transactionTypeOrError)
				.add(totalValueOrError);
			
			attachmentOrError && observer.add(attachmentOrError);
			noteOrError && observer.add(noteOrError);

			const result = observer.getResult();

			if (result.isFailure) {
				const message = result.errorValue();
				return Result.fail(message);
			}

			const calculation = await this.domainService.execute(dto);

			const aggregateOrError = TransactionAggregate.create({
				ID,
				userId,
				paymentDate: paymentDate.getResult(),
				reason: reasonOrError.getResult(),
				status: statusOrError.getResult(),
				transactionCalculations: [calculation],
				transactionType: transactionTypeOrError.getResult(),
				attachment: attachmentOrError ? attachmentOrError.getResult() : undefined,
				note: noteOrError ? noteOrError.getResult() : undefined,
				totalValue: totalValueOrError.getResult()
			});
			
			if (aggregateOrError.isFailure) {
				const message = aggregateOrError.errorValue();
				return Result.fail(message);
			}

			const aggregate = aggregateOrError.getResult();

			await this.transactionRepo.save(aggregate);

			return Result.success();
		} catch (error) {
			
			return Result.fail('Internal Server Error On Create Expense Use Case', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default CreateExpenseUseCase;
