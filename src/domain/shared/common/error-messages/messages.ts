import {
  TRANSACTION_CALCULATION_MIN_VALUE,
  TRANSACTION_NOTE_MAX_LENGHT,
  PASSWORD_MAX_LENGHT,
  PASSWORD_MIN_LENGHT,
  BUDGET_DESCRIPTION_MAX_LENGHT,
  BUDGET_DESCRIPTION_MIN_LENGHT,
  REASON_DESCRIPTION_MAX_LENGHT,
  REASON_DESCRIPTION_MIN_LENGHT,
} from '@domain/index';

export const ErrorMessages = {
  INVALID_BUDGET_DESCRIPTION_LENGHT: `Invalid budget description lenght, must have min ${BUDGET_DESCRIPTION_MIN_LENGHT} and max ${BUDGET_DESCRIPTION_MAX_LENGHT} characters`,
  INVALID_PASSWORD_LENGHT: `Password must have min ${PASSWORD_MIN_LENGHT} char and max ${PASSWORD_MAX_LENGHT} char`,
  INVALID_REASON_DESCRIPTION_LENGHT: `Invalid reason description lenght, must have min ${REASON_DESCRIPTION_MIN_LENGHT} and max ${REASON_DESCRIPTION_MAX_LENGHT} characters`,
  INVALID_TRANSACTION_CALCULATION_VALUE: `Value must be greatter or equal to ${TRANSACTION_CALCULATION_MIN_VALUE}`,
  INVALID_TRANSACTION_NOTE_LENGHT: `Note value must have max ${TRANSACTION_NOTE_MAX_LENGHT} characters`,
  INVALID_PERCENTAGE_VALUE: 'Invalid range value to percentage',
  INVALID_ATTACHMENT_PATH: 'Invalid attachment path or url',
  INVALID_ENUM_TRANSACTION_STATUS: 'Invalid transaction enum status',
  INVALID_ENUM_TRANSACTION_TYPE: 'Invalid transaction enum type',
  INVALID_EMAIL: 'Invalid email',
  INVALID_IP: 'Invalid ip',
  INVALID_OPERATIONAL_SYSTEM: 'Invalid operational system on terms',
};
