"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const RouteWrapper_1 = __importDefault(require("../helpers/RouteWrapper"));
const NotesService_1 = __importDefault(require("../services/NotesService"));
async function createNotes(req, res) {
    res.status(http_status_codes_1.default.OK).json({
        fileName: await NotesService_1.default.toPDF(req.body)
    });
}
exports.default = {
    createNotes: RouteWrapper_1.default(createNotes)
};
//# sourceMappingURL=NotesController.js.map