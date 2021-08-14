"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const RouteWrapper_1 = __importDefault(require("../helpers/RouteWrapper"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
async function logIn(req, res) {
    const { username, password, role } = req.body;
    const token = await AuthService_1.default.logIn(username, password, role);
    res.status(http_status_codes_1.default.OK).json({ token });
}
exports.default = {
    logIn: RouteWrapper_1.default(logIn)
};
//# sourceMappingURL=AuthController.js.map