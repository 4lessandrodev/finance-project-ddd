import { AggregateRoot, DomainId, Result, BaseDomainEntity, CurrencyValueObject, DateValueObject } from 'types-ddd';
import { CURRENCY } from '@config/env';
import { TransactionTypeValueObject } from './transaction-type.value-object';
import { TransactionStatusValueObject } from './transaction-status.value-object';
import { TransactionCalculationValueObject } from './transaction-calculations.value-object';
import { TransactionNoteValueObject } from './transaction-note.value-object';
import { AttachmentPathValueObject } from './attachment-path.value-object';

export interface TransactionAggregateProps extends BaseDomainEntity {
	userId: DomainId;
	reasonId: DomainId;
	paymentDate: DateValueObject;
	transactionType: TransactionTypeValueObject;
	status: TransactionStatusValueObject;
	transactionCalculations: TransactionCalculationValueObject[];
	note?: TransactionNoteValueObject;
	attachment?: AttachmentPathValueObject;
}

/**
 * @var userId: `UserIdValueObject`
 * @var reasonId: `ReasonIdValueObject`
 * @var paymentDate: `DateValueObject`
 * @var transactionType: `TransactionTypeValueObject`
 * @var status: `TransactionStatusValueObject`
 * @var transactionCalculations: `TransactionCalculationValueObject[]`
 * @var note?: `TransactionNoteValueObject`
 * @var attachment?: `AttachmentPathValueObject`
 */
export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps> {
	private _totalValue: CurrencyValueObject;
	private constructor (
		props: TransactionAggregateProps,
		total: CurrencyValueObject
	) {
		super(props, TransactionAggregate.name);
		this._totalValue = total;
	}

	get totalValue (): number {
		return this._totalValue.value;
	}

	get userId (): DomainId {
		return this.props.userId;
	}

	get reasonId (): DomainId {
		return this.props.reasonId;
	}

	get paymentDate (): DateValueObject {
		return this.props.paymentDate;
	}

	get transactionType (): TransactionTypeValueObject {
		return this.props.transactionType;
	}

	get status (): TransactionStatusValueObject {
		return this.props.status;
	}

	get transactionCalculations (): TransactionCalculationValueObject[] {
		return this.props.transactionCalculations;
	}

	get note (): TransactionNoteValueObject | null {
		return this.props.note ?? null;
	}

	get attachment (): AttachmentPathValueObject | null {
		return this.props.attachment ?? null;
	}

	public static create (
		props: TransactionAggregateProps
	): Result<TransactionAggregate> {
		/**
		 * total is calculated dynamically. Its the sum of calculation values
		 */
		const currency = CurrencyValueObject.create({
			currency: CURRENCY,
			value: 0
		}).getResult();

		props.transactionCalculations.forEach((cur)=> {
			currency.add(cur.currency.value);
		});

		return Result.ok<TransactionAggregate>(
			new TransactionAggregate(props, currency),
		);
	}
}
