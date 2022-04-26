export interface BalanceTransferenceDto {
	userId: string;
	sourceBoxId: string;
	destinationBoxId: string;
	total: number;
	reason: string;
	attachment?: string;
	note?: string;
}

export default BalanceTransferenceDto;
