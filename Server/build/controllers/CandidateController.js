"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const RouteWrapper_1 = __importDefault(require("../helpers/RouteWrapper"));
const CandidateService_1 = __importDefault(require("../services/CandidateService"));
async function getByEmailCompany(req, res) {
    res.status(http_status_codes_1.default.OK).json(await CandidateService_1.default.getByEmailCompany(req.params.email, req.params.company, req.params.role));
}
async function getByNameCompany(req, res) {
    const { lastname, company, role } = req.body;
    res.status(http_status_codes_1.default.OK).json(await CandidateService_1.default.getByNameCompany(lastname, company, role));
}
exports.default = {
    getByEmailCompany: RouteWrapper_1.default(getByEmailCompany),
    getByNameCompany: RouteWrapper_1.default(getByNameCompany)
};
//# sourceMappingURL=CandidateController.js.map