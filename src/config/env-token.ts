import { randomBytes } from "crypto";

export const DEFAULT_SECRET = randomBytes(42).toString('base64');
