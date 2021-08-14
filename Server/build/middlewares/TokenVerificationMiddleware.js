"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const UnauthorizedError_1 = __importDefault(require("../errors/UnauthorizedError"));
const UserDB_1 = require("../models/UserDB");
const AuthService_1 = __importDefault(require("../services/AuthService"));
function middleware(roles = []) {
    joi_1.default.assert(roles, joi_1.default.array().items(joi_1.default.string().valid(...Object.values(UserDB_1.Role))));
    return (req, res, next) => {
        try {
            if (!req.headers["authorization"])
                throw new UnauthorizedError_1.default("You need provide an token");
            const token = req.headers["authorization"].replace("Bearer ", "");
            const payload = AuthService_1.default.getPayloadFromToken(token);
            if (roles.length != 0 && !roles.includes(payload.role))
                throw new UnauthorizedError_1.default("You aren't allowed to access to resource");
            req.payload = payload;
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = middleware;
//# sourceMappingURL=TokenVerificationMiddleware.js.map