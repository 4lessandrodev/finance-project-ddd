import { ICalculation, ITransaction } from "@modules/shared";
import AttachmentPathValueObject from "@modules/transaction/domain/attachment-path.value-object";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import TransactionNoteValueObject from "@modules/transaction/domain/transaction-note.value-object";
import TransactionReasonDescriptionValueObject from "@modules/transaction/domain/transaction-reason.value-object";
import TransactionStatusValueObject from "@modules/transaction/domain/transaction-status.value-object";
import TransactionTypeValueObject from "@modules/transaction/domain/transaction-type.value-object";
import TransactionAggregate from "@modules/transaction/domain/transaction.aggregate";
import { Inject, Injectable } from "@nestjs/common";
import { ChangesObserver, DateValueObject, DomainId, Result, TMapper } from "types-ddd";
import TransactionCalculationToDomain from "./transaction-calculation.mapper";

@Injectable()
export class TransactionToDomainMapper implements TMapper<ITransaction, TransactionAggregate>{
	constructor (
		@Inject(TransactionCalculationToDomain)
		private readonly calcMapper: TMapper<ICalculation, TransactionCalculationValueObject>
	){}

	map (target: ITransaction): Result<TransactionAggregate, string> {
		
		const ID = DomainId.create(target.id);
		const userId = DomainId.create(target.userId);
		const reasonOrError = TransactionReasonDescriptionValueObject.create(target.reason);
		const paymentDateOrError = DateValueObject.create(target.paymentDate);
		const transactionTypeError = TransactionTypeValueObject.create(target.transactionType);
		const statusOrError = TransactionStatusValueObject.create(target.status);
		const transactionCalculationsOrError = target.transactionCalculations.map(this.calcMapper.map);
		const noteOrError = target.note && TransactionNoteValueObject.create(target.note);
		const attachmentOrError = target.attachment && AttachmentPathValueObject.create(target.attachment);

		const observer = ChangesObserver.init<unknown>(transactionCalculationsOrError);
		observer.add(reasonOrError);
		observer.add(paymentDateOrError);
		observer.add(transactionTypeError);
		observer.add(statusOrError);
		noteOrError && observer.add(noteOrError);
		attachmentOrError && observer.add(attachmentOrError);

		const result = observer.getResult();
		if (result.isFailure) {
			const message = result.errorValue();
			return Result.fail(message);
		}

		return TransactionAggregate.create({
			ID,
			userId,
			paymentDate: paymentDateOrError.getResult(),
			reason: reasonOrError.getResult(),
			status: statusOrError.getResult(),
			transactionCalculations: transactionCalculationsOrError
				.map((calc) => calc.getResult()),
			transactionType: transactionTypeError.getResult(),
			attachment: attachmentOrError ? attachmentOrError.getResult() : undefined,
			createdAt: target.createdAt,
			note: noteOrError ? noteOrError.getResult() : undefined,
			updatedAt: target.updatedAt,
			deletedAt: undefined,
			isDeleted: false,
		});
	};
}

export default TransactionToDomainMapper;
