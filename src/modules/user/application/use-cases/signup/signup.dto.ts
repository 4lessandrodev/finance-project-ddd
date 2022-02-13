export interface UserAgent {
	name: string;
	version: string;
	os: string;
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
	acceptedTerms: boolean;
}
