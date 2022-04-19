import { MongoClient } from "mongodb";

export interface IBaseConnection {
	instance(): Promise<MongoClient>;
}

export default IBaseConnection;
