export interface IUserAgent {
	name: string;
	version: string;
	os: string;
	type: string;
}

export interface ITerm {
	ip: string;
	acceptedAt: Date;
	userAgent: IUserAgent;
	isAccepted: boolean;
}

export interface IUser {
	readonly id: string;

	email: string;

	password: string;

	terms: Array<ITerm>;

	createdAt: Date;

	updatedAt: Date;

	isDeleted?: boolean;
}

export default IUser;
