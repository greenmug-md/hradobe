"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const RouteWrapper_1 = __importDefault(require("../helpers/RouteWrapper"));
const ContractService_1 = __importDefault(require("../services/ContractService"));
async function createContract(req, res) {
    await ContractService_1.default.createContract(req.body);
    res.status(http_status_codes_1.default.CREATED).send();
}
async function updateContract(req, res) {
    const { filename, id, html } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.updateContract(filename, id, html));
}
async function updateContractStatus(req, res) {
    const { id, status, role } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.updateContractStatus(id, status, role));
}
async function getContract(req, res) {
    const { id } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.getById(id));
}
async function getContractCompany(req, res) {
    const { company, role } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.getContractCompany(company, role));
}
async function getContractIdividual(req, res) {
    const { userId } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.getContractIdividual(userId));
}
async function multerData(req, res) {
    const { filename, token, email, role, id, contractname } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.multerData(filename, token, email, role, id, contractname));
}
async function getSigningURL(req, res) {
    const { agreementid, id } = req.body;
    res.status(http_status_codes_1.default.OK).json(await ContractService_1.default.getSigningURL(agreementid, id));
}
exports.default = {
    createContract: RouteWrapper_1.default(createContract),
    getContractCompany: RouteWrapper_1.default(getContractCompany),
    getContractIdividual: RouteWrapper_1.default(getContractIdividual),
    updateContract: RouteWrapper_1.default(updateContract),
    getContract: RouteWrapper_1.default(getContract),
    updateContractStatus: RouteWrapper_1.default(updateContractStatus),
    multerData: RouteWrapper_1.default(multerData),
    getSigningURL: RouteWrapper_1.default(getSigningURL),
};
//# sourceMappingURL=ContractController.js.map