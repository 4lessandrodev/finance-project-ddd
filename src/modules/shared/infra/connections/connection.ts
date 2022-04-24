import IBaseConnection from "./base-connection.interface";
import { MongoURI } from "@config/mongo.config";
import { MongoClient } from "mongodb";

export class BaseConnection implements IBaseConnection {

	protected conn: MongoClient | null = null;

	async instance (): Promise<MongoClient> {
		if (!this.conn) {			
			this.conn = new MongoClient(MongoURI);
			await this.conn.connect();
		}
		return this.conn;
	};
}

export default BaseConnection;
