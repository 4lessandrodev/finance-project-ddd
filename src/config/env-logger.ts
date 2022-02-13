import { Logger } from "types-ddd";

export const envLogger = (name: string, info: string) => Logger.info(`${name}: ${info}`);
