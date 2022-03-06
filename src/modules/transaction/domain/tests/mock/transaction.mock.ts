import { TransactionCalculationValueObject } from "@modules/transaction/domain/transaction-calculations.value-object";
import { TransactionStatusValueObject } from "@modules/transaction/domain/transaction-status.value-object";
import { TransactionTypeValueObject } from "@modules/transaction/domain/transaction-type.value-object";
import { TransactionNoteValueObject } from "@modules/transaction/domain/transaction-note.value-object";
import { TransactionAggregate } from "@modules/transaction/domain/transaction.aggregate";
import ITransaction from "@modules/shared/interfaces/transaction-model.interface";
import IMockEntity from "@modules/shared/interfaces/entity-mock.interface";
import { ChangesObserver, CurrencyValueObject, DateValueObject, DomainId, Result } from "types-ddd";
import { CURRENCY } from "@config/env";

export class TransactionMock implements IMockEntity<TransactionAggregate, ITransaction>{
	domain (props?: Partial<ITransaction>): Result<TransactionAggregate, string> {
		
		const ID = DomainId.create(props?.id ?? 'valid_id');
		const userId = DomainId.create(props?.userId ?? 'valid_user_id');
		const note = props?.note ? TransactionNoteValueObject.create(props.note) : undefined;
		const attachment = props?.attachment ? TransactionNoteValueObject.create(props.attachment) : undefined;
		const transactionType = TransactionTypeValueObject.create(props?.transactionType ?? 'ENTRADA');

		const transactionCalculations = props?.transactionCalculations?.map((calc) => TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create(calc.budgetBoxId),
			currency: CurrencyValueObject.create(calc.currency).getResult()
		})) ?? [
			TransactionCalculationValueObject.create({
				budgetBoxId: DomainId.create('valid_budget_box_id'),
				currency: CurrencyValueObject.create({
					currency: CURRENCY,
					value: 1000
				}).getResult()
			})
		];
		
		const status = TransactionStatusValueObject.create(props?.status ?? 'CONCLUIDO');

		const reasonId = DomainId.create(props?.reasonId ?? 'valid_reason_id');

		const paymentDate = DateValueObject.create(props?.paymentDate ?? new Date('2022-01-01 00:00:00'));

		const observer = ChangesObserver.init<unknown>(transactionCalculations);
		note && observer.add(note);
		attachment && observer.add(attachment);
		observer.add(transactionType);
		observer.add(status);
		observer.add(paymentDate);

		const result = observer.getResult();
		if (result.isFailure) {
			return Result.fail(result.errorValue());
		}

		return TransactionAggregate.create({
			ID,
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
			note: note?.getResult(),
			isDeleted: false,
			deletedAt: undefined,
			createdAt:props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			attachment: attachment?.getResult(),
			userId: userId,
			transactionType: transactionType.getResult(),
			transactionCalculations: transactionCalculations.map(
				(calc) => calc.getResult()
			),
			status: status.getResult(),
			reasonId: reasonId,
			paymentDate: paymentDate.getResult()
		});
	}
	model (props?: Partial<ITransaction>): ITransaction {
		return {
			id: props?.id ?? 'valid_id',
			userId: props?.userId ?? 'valid_user_id',
			reasonId: props?.reasonId ?? 'valid_reason_id',
			status: props?.status ?? 'CONCLUIDO',
			attachment: props?.attachment ?? 'http://s3-us-east-1.amazonaws.com/bucket/file.pdf',
			createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			note: props?.note ?? 'valid_note',
			paymentDate: props?.paymentDate ?? new Date('2022-01-01 00:00:00'),
			transactionCalculations: props?.transactionCalculations ?? [
				{
					budgetBoxId: 'valid_budget_box_id',
					currency: {
						currency: CURRENCY,
						value: 1000
					}
				}
			],
			transactionType: props?.transactionType ?? 'ENTRADA',
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
		};
	}
}