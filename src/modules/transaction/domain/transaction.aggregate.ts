import { AggregateRoot, DomainId, Result, BaseDomainEntity, CurrencyValueObject, DateValueObject } from 'types-ddd';
import { CURRENCY } from '@config/env';
import { TransactionTypeValueObject } from './transaction-type.value-object';
import { TransactionStatusValueObject } from './transaction-status.value-object';
import { TransactionCalculationValueObject } from './transaction-calculations.value-object';
import { TransactionNoteValueObject } from './transaction-note.value-object';
import { AttachmentPathValueObject } from './attachment-path.value-object';
import TransactionReasonDescriptionValueObject from './transaction-reason.value-object';

export interface TransactionAggregateProps extends BaseDomainEntity {
	userId: DomainId;
	reason: TransactionReasonDescriptionValueObject;
	paymentDate: DateValueObject;
	transactionType: TransactionTypeValueObject;
	status: TransactionStatusValueObject;
	transactionCalculations: TransactionCalculationValueObject[];
	note?: TransactionNoteValueObject;
	attachment?: AttachmentPathValueObject;
}

/**
 * @var userId: `UserIdValueObject`
 * @var reason: `TransactionReasonDescriptionValueObject`
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

	get reason (): TransactionReasonDescriptionValueObject {
		return this.props.reason;
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

	public static calculate (calculation: TransactionCalculationValueObject[]): CurrencyValueObject {
		const total = CurrencyValueObject.create({
			currency: CURRENCY,
			value: 0
		}).getResult();

		calculation.forEach((cur)=> {
			total.add(cur.currency.value);
		});

		return total;
	}

	applyCalculation (calculation: TransactionCalculationValueObject[]): void {
		const total = TransactionAggregate.calculate(calculation);
		this._totalValue = total;
		this.props.transactionCalculations = calculation;
	}

	public static isValid (props: TransactionAggregateProps): boolean {
		return props.transactionCalculations.length > 0;
	}

	public static create (
		props: TransactionAggregateProps
	): Result<TransactionAggregate> {

		const isValid = this.isValid(props);

		if (!isValid) {
			return Result.fail('Calculation is required');
		}
		/**
		 * total is calculated dynamically. Its the sum of calculation values
		 */
		const currency = this.calculate(props.transactionCalculations);

		return Result.ok<TransactionAggregate>(
			new TransactionAggregate(props, currency),
		);
	}
}

export default TransactionAggregate;
