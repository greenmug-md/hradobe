import config from "config";
import cors from "cors";
import Http from "http";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import "reflect-metadata";
import SocketIO, { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import AccountController from "./controllers/AccountController";
import AuthController from "./controllers/AuthController";
import CandidateController from "./controllers/CandidateController";
import ContractController from "./controllers/ContractController";
import NotesController from "./controllers/NotesController";
import Connection from "./database/Connection";
import ErrorMiddleware from "./middlewares/ErrorMiddleware";
import TokenVerificationMiddleware from "./middlewares/TokenVerificationMiddleware";
import logger from "./utils/Logger";

const express = require("express");
const expressServer = express();
const httpServer = Http.createServer(expressServer);
const socketIO = SocketIO(httpServer);

enum EANNOTAION_EVENT {
	ANNOTATION_ADDED = "ANNOTATION_ADDED",
	ANNOTATION_UPDATED = "ANNOTATION_UPDATED",
	ANNOTATION_DELETED = "ANNOTATION_DELETED",
}

socketIO.on("connection", (socket: Socket) => {
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

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "public", "files"));
	},
	filename: function (req, file, cb) {
		const fileName = uuidv4();
		const fileExtension = path.extname(file.originalname);

		cb(null, `${fileName}${fileExtension}`);
	},
});

const fileUpload = multer({ storage });

expressServer.use(morgan("dev"));
expressServer.use(express.json({ limit: "10mb" }));
expressServer.use(cors());
expressServer.use("/public", express.static(path.join(__dirname, "public")));

/*
 * Account
 */
expressServer.post("/user/signUp", AccountController.signUp);
expressServer.get("/user/current", TokenVerificationMiddleware(), AccountController.current);
/**
 * Access
 */
expressServer.post("/auth/logIn", AuthController.logIn);

expressServer.post("/candidates/email", CandidateController.getByEmailCompany);
 
expressServer.post("/candidates/lastname", CandidateController.getByNameCompany);
expressServer.post("/notes", NotesController.createNotes);
expressServer.post("/contract/create", ContractController.createContract);
expressServer.post("/contract/company", ContractController.getContractCompany);
expressServer.post("/contract/individual", ContractController.getContractIdividual);
expressServer.post("/contract/update", ContractController.updateContract);
expressServer.post("/contract/updatestatus", ContractController.updateContractStatus);
expressServer.post("/contract/get", ContractController.getContract);
expressServer.post("/contract/filedata", ContractController.multerData);
expressServer.post("/contract/signurl", ContractController.getSigningURL);

expressServer.use(ErrorMiddleware);

/**
 * Start the application
 */
async function start() {
	try {

		await Connection.connect();

		await new Promise((resolve) => {
			httpServer.listen(config.get("PORT"), () => {
				logger.info(`Server in port: ${config.get("PORT")}`);
				resolve();
			});
		});
	} catch (error) {
		logger.error(error);
	}
}

start();
