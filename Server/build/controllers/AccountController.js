"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const RouteWrapper_1 = __importDefault(require("../helpers/RouteWrapper"));
const UserService_1 = __importDefault(require("../services/UserService"));
async function signUp(req, res) {
    await UserService_1.default.create(req.body);
    res.status(http_status_codes_1.default.CREATED).send();
}
async function current(req, res) {
    res.status(http_status_codes_1.default.OK).json(req.payload);
}
exports.default = {
    signUp: RouteWrapper_1.default(signUp),
    current: RouteWrapper_1.default(current)
};
//# sourceMappingURL=AccountController.js.map