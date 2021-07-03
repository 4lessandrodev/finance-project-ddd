import {
	TRANSACTION_CALCULATION_MIN_VALUE,
	TRANSACTION_NOTE_MAX_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	BUDGET_DESCRIPTION_MAX_LENGTH,
	BUDGET_DESCRIPTION_MIN_LENGTH,
	REASON_DESCRIPTION_MAX_LENGTH,
	REASON_DESCRIPTION_MIN_LENGTH,
} from '@domain/index';

export const ErrorMessages = {
	INVALID_BUDGET_DESCRIPTION_LENGTH: `Invalid budget description length, must have min ${BUDGET_DESCRIPTION_MIN_LENGTH} and max ${BUDGET_DESCRIPTION_MAX_LENGTH} characters`,
	INVALID_PASSWORD_LENGTH: `Password must have min ${PASSWORD_MIN_LENGTH} char and max ${PASSWORD_MAX_LENGTH} char`,
	INVALID_REASON_DESCRIPTION_LENGTH: `Invalid reason description length, must have min ${REASON_DESCRIPTION_MIN_LENGTH} and max ${REASON_DESCRIPTION_MAX_LENGTH} characters`,
	INVALID_TRANSACTION_CALCULATION_VALUE: `Value must be greater or equal to ${TRANSACTION_CALCULATION_MIN_VALUE}`,
	INVALID_TRANSACTION_NOTE_LENGTH: `Note value must have max ${TRANSACTION_NOTE_MAX_LENGTH} characters`,
	INVALID_PERCENTAGE_VALUE: 'Invalid range value to percentage',
	INVALID_ATTACHMENT_PATH: 'Invalid attachment path or url',
	INVALID_ENUM_TRANSACTION_STATUS: 'Invalid transaction enum status',
	INVALID_ENUM_TRANSACTION_TYPE: 'Invalid transaction enum type',
	INVALID_EMAIL: 'Invalid email',
	INVALID_IP: 'Invalid ip'
};
