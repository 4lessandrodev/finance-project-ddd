import { IDomainService } from "@modules/shared";
import AttachmentPathValueObject from "@modules/transaction/domain/attachment-path.value-object";
import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import {
	CreateSingleCalculationDto
} from "@modules/transaction/domain/services/create-single-calculation.domain-service";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import TransactionNoteValueObject from "@modules/transaction/domain/transaction-note.value-object";
import TransactionReasonDescriptionValueObject from "@modules/transaction/domain/transaction-reason.value-object";
import TransactionStatusValueObject from "@modules/transaction/domain/transaction-status.value-object";
import TransactionTypeValueObject from "@modules/transaction/domain/transaction-type.value-object";
import TransactionAggregate from "@modules/transaction/domain/transaction.aggregate";
import { Inject } from "@nestjs/common";
import { ChangesObserver, DateValueObject, DomainId, IUseCase, Result } from "types-ddd";
import Dto from "./balance-transference.dto";

export class BalanceTransferenceUseCase implements IUseCase<Dto, Result<void>>{

	constructor (
		@Inject('TransactionRepository')
		private readonly transactionRepo: ITransactionRepository,

		@Inject('CreateSingleCalculationDomainService')
		private readonly domainService: IDomainService<CreateSingleCalculationDto, TransactionCalculationValueObject>
	){}

	async execute (dto: Dto): Promise<Result<void, string>>{
		try {

			const reasonOrError = TransactionReasonDescriptionValueObject.create(dto.reason);
			const noteOrError = dto.note && TransactionNoteValueObject.create(dto.note);
			const attachmentOrError = dto.attachment && AttachmentPathValueObject.create(dto.attachment);

			if (reasonOrError.isFailure) {
				const message = reasonOrError.error;
				return Result.fail(message);
			}

			const calculationOut = await this.domainService.execute({
				budgetBoxId: dto.sourceBoxId,
				total: dto.total,
				userId: dto.userId
			});

			const calculationIn = await this.domainService.execute({
				budgetBoxId: dto.destinationBoxId,
				total: dto.total,
				userId: dto.userId
			});
			
			const transactionInOrError = TransactionAggregate.create({
				ID: DomainId.create(),
				paymentDate: DateValueObject.create().getResult(),
				status: TransactionStatusValueObject.create('CONCLUIDO').getResult(),
				transactionCalculations: [calculationIn],
				transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
				userId: DomainId.create(dto.userId),
				reason: reasonOrError.getResult()
			});

			const transactionOutOrError = TransactionAggregate.create({
				ID: DomainId.create(),
				paymentDate: DateValueObject.create().getResult(),
				status: TransactionStatusValueObject.create('CONCLUIDO').getResult(),
				transactionCalculations: [calculationOut],
				transactionType: TransactionTypeValueObject.create('SAIDA').getResult(),
				userId: DomainId.create(dto.userId),
				reason: reasonOrError.getResult()
			});

			const observer = ChangesObserver.init();

			observer.add(transactionInOrError);
			observer.add(transactionOutOrError);
			attachmentOrError && observer.add(attachmentOrError);
			noteOrError && observer.add(noteOrError);

			const result = observer.getResult();

			if (result.isFailure) {
				const message = result.errorValue();
				return Result.fail(message);
			}

			const transactionIn = transactionInOrError.getResult();

			const transactionOut = transactionOutOrError.getResult();

			await this.transactionRepo.save(transactionIn);

			await this.transactionRepo.save(transactionOut);

			return Result.success();

		} catch (error) {
			return Result.fail(
				'Internal Server Error On Balance Transference Use Case',
				'INTERNAL_SERVER_ERROR'
			);
		}
	};
}

export default BalanceTransferenceUseCase;
