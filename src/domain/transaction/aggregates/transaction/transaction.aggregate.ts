import {
  AggregateRoot,
  DateValueObject,
  ReasonIdValueObject,
  Result,
  UniqueEntityID,
} from '@shared/index';
import {
  AttachmentPathValueObject,
  TransactionCalculationValueObject,
  TransactionNoteValueObject,
  TransactionStatusValueObject,
  TransactionTypeValueObject,
  UserIdValueObject,
} from '@domain/index';

export interface TransactionAggregateProps {
  userId: UserIdValueObject;
  reasonId: ReasonIdValueObject;
  paymentDate: DateValueObject;
  transactionType: TransactionTypeValueObject;
  status: TransactionStatusValueObject;
  transactionCalculations: TransactionCalculationValueObject[];
  note?: TransactionNoteValueObject;
  attachment?: AttachmentPathValueObject;
}

export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps> {
  private _totalValue: number;
  private constructor(
    props: TransactionAggregateProps,
    total: number,
    id?: UniqueEntityID,
  ) {
    super(props, id);
    this._totalValue = total;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  get userId(): UserIdValueObject {
    return this.props.userId;
  }

  get reasonId(): ReasonIdValueObject {
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
    props: TransactionAggregateProps,
    id?: UniqueEntityID,
  ): Result<TransactionAggregate> {
    /**
     * total is calculated dinamicaly. Its the sum of calculation values
     */
    const total = props.transactionCalculations.reduce(
      (total, calc) => calc.calculation.value + total,
      0,
    );

    return Result.ok<TransactionAggregate>(
      new TransactionAggregate(props, total, id),
    );
  }
}
