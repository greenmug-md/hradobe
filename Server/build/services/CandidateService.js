"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const typeorm_1 = require("typeorm");
const UserDB_1 = __importDefault(require("../models/UserDB"));
async function getByEmailCompany(email, company, role) {
    joi_1.default.assert({
        email,
        company,
        role
    }, joi_1.default.object({
        email: joi_1.default.string().trim().required(),
        company: joi_1.default.string().required(),
        role: joi_1.default.string().required()
    }));
    return await typeorm_1.getRepository(UserDB_1.default).find({
        where: {
            email,
            company,
            role
        }
    });
}
async function getByNameCompany(lastname, company, role) {
    joi_1.default.assert({
        lastname,
        company,
        role
    }, joi_1.default.object({
        lastname: joi_1.default.string().trim().required(),
        company: joi_1.default.string().required(),
        role: joi_1.default.string().required()
    }));
    return await typeorm_1.getRepository(UserDB_1.default).find({
        where: {
            lastname: typeorm_1.Like(`%${lastname}%`),
            company,
            role
        }
    });
}
exports.default = {
    getByEmailCompany,
    getByNameCompany
};
//# sourceMappingURL=CandidateService.js.map