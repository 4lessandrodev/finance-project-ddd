import { systemTypes } from '@domain/user/value-objects';

export interface UserAgent {
	name: string;
	version: string;
	os: systemTypes;
	type: string;
}

export interface Term {
	ip: string;
	acceptedAt: Date;
	userAgent: UserAgent;
}

export interface SignUpDto {
	email: string;
	password: string;
	term: Term;
}
