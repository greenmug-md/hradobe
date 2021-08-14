"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const typeorm_1 = require("typeorm");
const BadParameterError_1 = __importDefault(require("../errors/BadParameterError"));
const UserDB_1 = __importStar(require("../models/UserDB"));
async function getByCredentials(username, password, role) {
    joi_1.default.assert({
        username,
        password,
        role,
    }, joi_1.default.object({
        username: joi_1.default.string().trim().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().valid(...Object.values(UserDB_1.Role)),
    }));
    return await typeorm_1.getRepository(UserDB_1.default).findOne({
        where: {
            username,
            password,
            role,
        },
    });
}
async function usernameAlreadyRegistered(username) {
    joi_1.default.assert({
        username,
    }, joi_1.default.object({
        username: joi_1.default.string().trim().required(),
    }));
    const userDB = await typeorm_1.getRepository(UserDB_1.default).findOne({
        where: { username },
    });
    return userDB !== undefined;
}
async function emailAlreadyRegistered(email) {
    joi_1.default.assert({
        email,
    }, joi_1.default.object({
        email: joi_1.default.string().trim().required(),
    }));
    const userDB = await typeorm_1.getRepository(UserDB_1.default).findOne({
        where: { email },
    });
    return userDB !== undefined;
}
async function create(createUser) {
    joi_1.default.assert(createUser, joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        firstname: joi_1.default.string().optional(),
        lastname: joi_1.default.string().optional(),
        company: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        role: joi_1.default.string().valid(...Object.values(UserDB_1.Role)),
    }));
    if (await usernameAlreadyRegistered(createUser.username))
        throw new BadParameterError_1.default("Username already registered");
    if (await emailAlreadyRegistered(createUser.email))
        throw new BadParameterError_1.default("Email already registered");
    const newUserDB = new UserDB_1.default();
    newUserDB.username = createUser.username;
    newUserDB.password = createUser.password;
    newUserDB.firstname = createUser.firstname;
    newUserDB.lastname = createUser.lastname;
    newUserDB.company = createUser.company;
    newUserDB.email = createUser.email;
    newUserDB.role = createUser.role;
    await typeorm_1.getRepository(UserDB_1.default).save(newUserDB);
}
exports.default = {
    create,
    usernameAlreadyRegistered,
    emailAlreadyRegistered,
    getByCredentials,
};
//# sourceMappingURL=UserService.js.map