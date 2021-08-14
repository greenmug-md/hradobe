"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const ContractDB_1 = __importDefault(require("../models/ContractDB"));
const UserDB_1 = __importDefault(require("../models/UserDB"));
const DEFAULT_CONFIG = {
    type: "sqlite",
    database: path_1.default.join(__dirname, "..", "data.sqlite"),
    synchronize: true,
    entities: [
        UserDB_1.default,
        ContractDB_1.default
    ]
};
async function connect() {
    return typeorm_1.createConnection(DEFAULT_CONFIG);
}
exports.default = {
    connect
};
//# sourceMappingURL=Connection.js.map