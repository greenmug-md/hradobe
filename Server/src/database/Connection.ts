import path from "path"
import { Connection, ConnectionOptions, createConnection } from "typeorm"
import ContractDB from "../models/ContractDB"
import UserDB from "../models/UserDB"

const DEFAULT_CONFIG:ConnectionOptions = {
	type: "sqlite",
	database: path.join(__dirname, "..", "data.sqlite"),
	synchronize: true,
	entities: [
		UserDB,
		ContractDB
	]
}

async function connect():Promise<Connection> {
	return createConnection(DEFAULT_CONFIG)
}

export default {
	connect
}
