import { Logger } from "types-ddd";

export const logger = {
	info: (name: string, info: string) => Logger.info(`${name}: ${info}`)
};
