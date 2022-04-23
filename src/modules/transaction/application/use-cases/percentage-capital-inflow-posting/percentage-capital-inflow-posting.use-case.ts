import { Inject } from "@nestjs/common";
import { ChangesObserver, CurrencyValueObject, DateValueObject, DomainId, IUseCase, Result } from "types-ddd";
import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import TransactionAggregate from "@modules/transaction/domain/transaction.aggregate";
import ReasonDescriptionValueObject from "@modules/budget-box/domain/reason-description.value-object";
import AttachmentPathValueObject from "@modules/transaction/domain/attachment-path.value-object";
import TransactionStatusValueObject from "@modules/transaction/domain/transaction-status.value-object";
import TransactionNoteValueObject from "@modules/transaction/domain/transaction-note.value-object";
import TransactionTypeValueObject from "@modules/transaction/domain/transaction-type.value-object";
import { IDomainService } from "@modules/shared";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import Dto from "./percentage-capital-inflow-posting.dto";
import { PercentageCalculationDomainServiceDto } from "@modules/transaction/domain/services/create-percentage-transaction-calculation.domain-service";
import { CURRENCY } from "@config/env";

export class PercentageCapitalInflowPostingUseCase implements IUseCase<Dto, Result<void>>{
	constructor (
		@Inject('TransactionRepository')
		private readonly transactionRepo: ITransactionRepository,

		@Inject('CalculationDomainService')
		private readonly createCalcDomainService: IDomainService<PercentageCalculationDomainServiceDto, TransactionCalculationValueObject[]>
	) { }
	
	async execute (dto: Dto): Promise<Result<void, string>>{
		try {
			const { userId, total, reason, status, attachment, note, paymentDate } = dto;
			
			const totalOrError = CurrencyValueObject.create({ currency: CURRENCY, value: total });
			const reasonOrError = ReasonDescriptionValueObject.create(reason);
			const statusOrError = TransactionStatusValueObject.create(status);
			const attachmentOrError = attachment && AttachmentPathValueObject.create(attachment);
			const noteOrError = note && TransactionNoteValueObject.create(note);
			const paymentDateOrError = DateValueObject.create(paymentDate);
			const ID = DomainId.create();
			const transactionTypeOrError = TransactionTypeValueObject.create('ENTRADA');
			const ownerId = DomainId.create(userId);

			const observer = ChangesObserver.init<unknown>();

			observer
				.add(totalOrError)
				.add(reasonOrError)
				.add(paymentDateOrError)
				.add(transactionTypeOrError)
				.add(statusOrError);
			
			noteOrError && observer.add(noteOrError);
			attachmentOrError && observer.add(attachmentOrError);

			const result = observer.getResult();

			if (result.isFailure) {
				const message = result.errorValue();
				return Result.fail(message);
			}

			const calculation = await this
				.createCalcDomainService
				.execute({ userId, total });

			const aggregateOrError = TransactionAggregate.create({
				ID,
				transactionCalculations: calculation,
				paymentDate: paymentDateOrError.getResult(),
				reason: reasonOrError.getResult(),
				status: statusOrError.getResult(),
				transactionType: transactionTypeOrError.getResult(),
				userId: ownerId,
				attachment: attachmentOrError ? attachmentOrError.getResult(): undefined,
				note: noteOrError ? noteOrError.getResult() : undefined,
			});

			if (aggregateOrError.isFailure) {
				const message = aggregateOrError.error;
				return Result.fail(message);
			}

			const aggregate = aggregateOrError.getResult();

			await this.transactionRepo.save(aggregate);

			return Result.success();

		} catch (error) {		
			return Result.fail(
				'Internal Server Error On Percentage Capital Inflow Posting Use Case',
				'INTERNAL_SERVER_ERROR'
			);
		}	
	};
}

export default PercentageCapitalInflowPostingUseCase;
