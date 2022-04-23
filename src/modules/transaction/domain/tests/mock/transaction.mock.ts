import { TransactionCalculationValueObject } from "@modules/transaction/domain/transaction-calculations.value-object";
import { TransactionStatusValueObject } from "@modules/transaction/domain/transaction-status.value-object";
import { TransactionTypeValueObject } from "@modules/transaction/domain/transaction-type.value-object";
import { TransactionNoteValueObject } from "@modules/transaction/domain/transaction-note.value-object";
import { TransactionAggregate } from "@modules/transaction/domain/transaction.aggregate";
import { ITransaction, IMockEntity } from "@shared/index";
import { ChangesObserver, CurrencyValueObject, DateValueObject, DomainId, Result } from "types-ddd";
import { CURRENCY } from "@config/env";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";
import TransactionReasonDescriptionValueObject from "@modules/transaction/domain/transaction-reason.value-object";

export class TransactionMock implements IMockEntity<TransactionAggregate, ITransaction>{
	domain (props?: Partial<ITransaction>): Result<TransactionAggregate, string> {
		
		const ID = DomainId.create(props?.id ?? 'valid_id');
		const userId = DomainId.create(props?.userId ?? 'valid_user_id');
		const note = props?.note ? TransactionNoteValueObject.create(props.note) : undefined;
		const attachment = props?.attachment ? TransactionNoteValueObject.create(props.attachment) : undefined;
		const reason = TransactionReasonDescriptionValueObject.create(props?.reason ?? 'valid_reason');
		const transactionType = TransactionTypeValueObject.create(props?.transactionType ?? 'ENTRADA');

		const transactionCalculations = props?.transactionCalculations?.map((calc) => TransactionCalculationValueObject.create({
			budgetBoxName: TransactionBudgetBoxNameValueObject.create(calc.budgetBoxName).getResult(),
			budgetBoxId: DomainId.create(calc.budgetBoxId),
			currency: CurrencyValueObject.create(calc.currency).getResult()
		})) ?? [
			TransactionCalculationValueObject.create({
				budgetBoxName: TransactionBudgetBoxNameValueObject.create('valid_name').getResult(),
				budgetBoxId: DomainId.create('valid_budget_box_id'),
				currency: CurrencyValueObject.create({ currency: CURRENCY, value: 1000 }).getResult()
			})
		];
		
		const status = TransactionStatusValueObject.create(props?.status ?? 'CONCLUIDO');


		const paymentDate = DateValueObject.create(props?.paymentDate ?? new Date('2022-01-01 00:00:00'));

		const observer = ChangesObserver.init<unknown>(transactionCalculations);
		note && observer.add(note);
		attachment && observer.add(attachment);
		observer.add(transactionType);
		observer.add(status);
		observer.add(paymentDate);
		observer.add(reason);

		const result = observer.getResult();
		if (result.isFailure) {
			return Result.fail(result.errorValue());
		}

		return TransactionAggregate.create({
			ID,
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
			note: note?.getResult(),
			createdAt:props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			attachment: attachment?.getResult(),
			userId: userId,
			transactionType: transactionType.getResult(),
			transactionCalculations: transactionCalculations.map(
				(calc) => calc.getResult()
			),
			status: status.getResult(),
			reason: reason.getResult(),
			paymentDate: paymentDate.getResult(),
			isDeleted: false,
			deletedAt: undefined,
		});
	}
	model (props?: Partial<ITransaction>): ITransaction {
		return {
			id: props?.id ?? 'valid_id',
			userId: props?.userId ?? 'valid_user_id',
			reason: props?.reason ?? 'valid_reason_id',
			status: props?.status ?? 'CONCLUIDO',
			attachment: props?.attachment ?? 'http://s3-us-east-1.amazonaws.com/bucket/file.pdf',
			createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			note: props?.note ?? 'valid_note',
			paymentDate: props?.paymentDate ?? new Date('2022-01-01 00:00:00'),
			totalValue: props?.totalValue ?? {
				currency: 'BRL',
				value: 1000
			},
			transactionCalculations: props?.transactionCalculations ?? [
				{
					budgetBoxName: 'valid_name',
					budgetBoxId: 'valid_budget_box_id',
					currency: {
						currency: CURRENCY,
						value: 1000
					}
				}
			],
			transactionType: props?.transactionType ?? 'ENTRADA',
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
			isDeleted: false,
			deletedAt: undefined,
		};
	}
}
export default TransactionMock;
