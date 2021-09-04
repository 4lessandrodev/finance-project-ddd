import { AggregateRoot, DomainId, Result, BaseDomainEntity } from 'types-ddd';
import { DateValueObject } from '@shared/index';
import {
  AttachmentPathValueObject,
  TransactionCalculationValueObject,
  TransactionNoteValueObject,
  TransactionStatusValueObject,
  TransactionTypeValueObject
} from '@domain/index';

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
  private _totalValue: number;
  private constructor(
    props: TransactionAggregateProps,
    total: number
  ) {
    super(props, TransactionAggregate.name);
    this._totalValue = total;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  get userId(): DomainId {
    return this.props.userId;
  }

  get reasonId(): DomainId {
    return this.props.reasonId;
  }

  get paymentDate(): DateValueObject {
    return this.props.paymentDate;
  }

  get transactionType(): TransactionTypeValueObject {
    return this.props.transactionType;
  }

  get status(): TransactionStatusValueObject {
    return this.props.status;
  }

  get transactionCalculations(): TransactionCalculationValueObject[] {
    return this.props.transactionCalculations;
  }

  get note(): TransactionNoteValueObject | null {
    return this.props.note ?? null;
  }

  get attachment(): AttachmentPathValueObject | null {
    return this.props.attachment ?? null;
  }

  public static create(
    props: TransactionAggregateProps
  ): Result<TransactionAggregate> {
    /**
     * total is calculated dynamically. Its the sum of calculation values
     */
    const total = props.transactionCalculations.reduce(
      (total, calc) => calc.calculation.value + total,
      0,
    );

    return Result.ok<TransactionAggregate>(
      new TransactionAggregate(props, total),
    );
  }
}
