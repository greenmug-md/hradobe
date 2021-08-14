"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const socket_io_1 = __importDefault(require("socket.io"));
const uuid_1 = require("uuid");
const AccountController_1 = __importDefault(require("./controllers/AccountController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const CandidateController_1 = __importDefault(require("./controllers/CandidateController"));
const ContractController_1 = __importDefault(require("./controllers/ContractController"));
const NotesController_1 = __importDefault(require("./controllers/NotesController"));
const Connection_1 = __importDefault(require("./database/Connection"));
const ErrorMiddleware_1 = __importDefault(require("./middlewares/ErrorMiddleware"));
const TokenVerificationMiddleware_1 = __importDefault(require("./middlewares/TokenVerificationMiddleware"));
const Logger_1 = __importDefault(require("./utils/Logger"));
const express = require("express");
const expressServer = express();
const httpServer = http_1.default.createServer(expressServer);
const socketIO = socket_io_1.default(httpServer);
var EANNOTAION_EVENT;
(function (EANNOTAION_EVENT) {
    EANNOTAION_EVENT["ANNOTATION_ADDED"] = "ANNOTATION_ADDED";
    EANNOTAION_EVENT["ANNOTATION_UPDATED"] = "ANNOTATION_UPDATED";
    EANNOTAION_EVENT["ANNOTATION_DELETED"] = "ANNOTATION_DELETED";
})(EANNOTAION_EVENT || (EANNOTAION_EVENT = {}));
socketIO.on("connection", (socket) => {
    console.log("Client connected");
    socket.on(EANNOTAION_EVENT.ANNOTATION_ADDED, (data) => {
        socket.broadcast.emit(EANNOTAION_EVENT.ANNOTATION_ADDED, data);
    });
    socket.on(EANNOTAION_EVENT.ANNOTATION_UPDATED, (data) => {
        socket.broadcast.emit(EANNOTAION_EVENT.ANNOTATION_UPDATED, data);
    });
    socket.on(EANNOTAION_EVENT.ANNOTATION_DELETED, (data) => {
        socket.broadcast.emit(EANNOTAION_EVENT.ANNOTATION_DELETED, data);
    });
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "public", "files"));
    },
    filename: function (req, file, cb) {
        const fileName = uuid_1.v4();
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, `${fileName}${fileExtension}`);
    },
});
const fileUpload = multer_1.default({ storage });
expressServer.use(morgan_1.default("dev"));
expressServer.use(express.json({ limit: "10mb" }));
expressServer.use(cors_1.default());
expressServer.use("/public", express.static(path_1.default.join(__dirname, "public")));
expressServer.post("/user/signUp", AccountController_1.default.signUp);
expressServer.get("/user/current", TokenVerificationMiddleware_1.default(), AccountController_1.default.current);
expressServer.post("/auth/logIn", AuthController_1.default.logIn);
expressServer.post("/candidates/email", CandidateController_1.default.getByEmailCompany);
expressServer.post("/candidates/lastname", CandidateController_1.default.getByNameCompany);
expressServer.post("/notes", NotesController_1.default.createNotes);
expressServer.post("/contract/create", ContractController_1.default.createContract);
expressServer.post("/contract/company", ContractController_1.default.getContractCompany);
expressServer.post("/contract/individual", ContractController_1.default.getContractIdividual);
expressServer.post("/contract/update", ContractController_1.default.updateContract);
expressServer.post("/contract/updatestatus", ContractController_1.default.updateContractStatus);
expressServer.post("/contract/get", ContractController_1.default.getContract);
expressServer.post("/contract/filedata", ContractController_1.default.multerData);
expressServer.post("/contract/signurl", ContractController_1.default.getSigningURL);
expressServer.use(ErrorMiddleware_1.default);
async function start() {
    try {
        await Connection_1.default.connect();
        await new Promise((resolve) => {
            httpServer.listen(config_1.default.get("PORT"), () => {
                Logger_1.default.info(`Server in port: ${config_1.default.get("PORT")}`);
                resolve();
            });
        });
    }
    catch (error) {
        Logger_1.default.error(error);
    }
}
start();
//# sourceMappingURL=index.js.map