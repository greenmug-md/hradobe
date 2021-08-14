"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const BadParameterError_1 = __importDefault(require("../errors/BadParameterError"));
const EntityNotFoundError_1 = __importDefault(require("../errors/EntityNotFoundError"));
const InvalidTokenError_1 = __importDefault(require("../errors/InvalidTokenError"));
const joi_1 = __importDefault(require("@hapi/joi"));
const Logger_1 = __importDefault(require("../utils/Logger"));
function middleware(error, req, res, next) {
    let statusResponse = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    const responseObject = {
        message: error.message || ""
    };
    if (error instanceof BadParameterError_1.default) {
        statusResponse = http_status_codes_1.default.BAD_REQUEST;
    }
    else if (error instanceof EntityNotFoundError_1.default) {
        statusResponse = http_status_codes_1.default.NOT_FOUND;
    }
    else if (error instanceof InvalidTokenError_1.default) {
        statusResponse = http_status_codes_1.default.UNAUTHORIZED;
    }
    else if (joi_1.default.isError(error)) {
        statusResponse = http_status_codes_1.default.BAD_REQUEST;
        responseObject.message = "";
        for (const detailError of error.details)
            responseObject.message += `${detailError.message} - `;
    }
    Logger_1.default.error(error);
    res.status(statusResponse).json(responseObject);
    next();
}
exports.default = middleware;
//# sourceMappingURL=ErrorMiddleware.js.map