"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadParameterError_1 = __importDefault(require("../errors/BadParameterError"));
const InvalidTokenError_1 = __importDefault(require("../errors/InvalidTokenError"));
const UserDB_1 = require("../models/UserDB");
const UserService_1 = __importDefault(require("./UserService"));
function generateTokenFromUser(userDB) {
    joi_1.default.assert({
        id: userDB.id,
        role: userDB.role,
        username: userDB.username,
        company: userDB.company,
        email: userDB.email
    }, joi_1.default.object({
        id: joi_1.default.string().guid().required(),
        role: joi_1.default.valid(...Object.values(UserDB_1.Role)).required(),
        username: joi_1.default.string().required(),
        company: joi_1.default.string().required(),
        email: joi_1.default.string().required()
    }));
    const payload = {
        id: userDB.id,
        role: userDB.role,
        username: userDB.username,
        company: userDB.company,
        email: userDB.email
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default.get("JWT_KEY"));
}
function getPayloadFromToken(token) {
    joi_1.default.assert(token, joi_1.default.string().required());
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.get("JWT_KEY"));
        return payload;
    }
    catch (error) {
        throw new InvalidTokenError_1.default("Invalid token");
    }
}
async function logIn(username, password, role) {
    joi_1.default.assert({
        username,
        password,
        role
    }, joi_1.default.object({
        username: joi_1.default.string().trim().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().required()
    }));
    const userDB = await UserService_1.default.getByCredentials(username, password, role);
    if (userDB === undefined)
        throw new BadParameterError_1.default("Incorrect username or password");
    return generateTokenFromUser(userDB);
}
exports.default = {
    generateTokenFromUser,
    getPayloadFromToken,
    logIn
};
//# sourceMappingURL=AuthService.js.map