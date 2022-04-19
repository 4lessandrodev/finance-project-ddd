import { randomBytes } from "crypto";

export const DEFAULT_SECRET = process.env.NODE_ENV === 'production' ?
	randomBytes(42).toString('base64') : 'default-value';
