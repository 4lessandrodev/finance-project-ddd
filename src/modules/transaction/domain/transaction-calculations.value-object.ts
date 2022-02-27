import { ErrorMessages } from '@shared/index';
import { Result, ValueObject, DomainId, CurrencyValueObject } from 'types-ddd';

export const TRANSACTION_CALCULATION_MIN_VALUE = 0;

interface calculationProps {
  budgetBoxId: DomainId;
  currency: CurrencyValueObject;
}

export class TransactionCalculationValueObject extends ValueObject<calculationProps> {
	private constructor (props: calculationProps) {
		super(props);
	}

	get budgetBoxId (): DomainId {
		return this.props.budgetBoxId;
	}

	get currency (): CurrencyValueObject {
		return this.props.currency;
	}

	public static create (
		props: calculationProps,
	): Result<TransactionCalculationValueObject> {
		const isValidValue = props.currency.value >= TRANSACTION_CALCULATION_MIN_VALUE;

		if (!isValidValue) {
			return Result.fail<TransactionCalculationValueObject>(
				ErrorMessages.INVALID_TRANSACTION_CALCULATION_VALUE,
			);
		}

		return Result.ok<TransactionCalculationValueObject>(
			new TransactionCalculationValueObject({ ...props }),
		);
	}
}

