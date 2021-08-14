"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const EntityNotFoundError_1 = __importDefault(require("../errors/EntityNotFoundError"));
const ContractDB_1 = __importStar(require("../models/ContractDB"));
const Logger_1 = __importDefault(require("../utils/Logger"));
var request = require('request');
async function getContractCompany(company, role) {
    joi_1.default.assert({
        company,
        role
    }, joi_1.default.object({
        company: joi_1.default.string().trim().required(),
        role: joi_1.default.string().trim().required()
    }));
    return await typeorm_1.getRepository(ContractDB_1.default).find({
        where: {
            company,
            role
        }
    });
}
async function getContractIdividual(userId) {
    joi_1.default.assert({
        userId
    }, joi_1.default.object({
        userId: joi_1.default.string().trim().required()
    }));
    return await typeorm_1.getRepository(ContractDB_1.default).find({
        where: {
            userId
        }
    });
}
async function createContract(createContract) {
    joi_1.default.assert(createContract, joi_1.default.object({
        filename: joi_1.default.string().required(),
        userId: joi_1.default.string().required(),
        firstname: joi_1.default.string().optional(),
        lastname: joi_1.default.string().optional(),
        username: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        company: joi_1.default.string().required(),
        statuscandidate: joi_1.default.string().required(),
        statuscompany: joi_1.default.string().required(),
        contractname: joi_1.default.string().required(),
        role: joi_1.default.string().valid(...Object.values(ContractDB_1.Role)),
        html: joi_1.default.string().required()
    }));
    const newContractDB = new ContractDB_1.default();
    newContractDB.filename = createContract.filename;
    newContractDB.userId = createContract.userId;
    newContractDB.firstname = createContract.firstname;
    newContractDB.lastname = createContract.lastname;
    newContractDB.company = createContract.company;
    newContractDB.email = createContract.email;
    newContractDB.username = createContract.username;
    newContractDB.statuscandidate = createContract.statuscandidate;
    newContractDB.statuscompany = createContract.statuscompany;
    newContractDB.contractname = createContract.contractname;
    newContractDB.role = createContract.role;
    newContractDB.html = createContract.html;
    await typeorm_1.getRepository(ContractDB_1.default).save(newContractDB);
}
async function updateContract(filename, id, html) {
    joi_1.default.assert({
        filename,
        id,
        html,
    }, joi_1.default.object({
        filename: joi_1.default.string().required(),
        id: joi_1.default.string().guid().required(),
        html: joi_1.default.string().trim().required(),
    }));
    const contractDB = await getById(id);
    contractDB.html = html;
    contractDB.filename = filename;
    await typeorm_1.getRepository(ContractDB_1.default).save(contractDB);
    return contractDB;
}
async function updateContractStatus(id, status, role) {
    joi_1.default.assert({
        id,
        status,
        role,
    }, joi_1.default.object({
        id: joi_1.default.string().guid().required(),
        status: joi_1.default.string().trim().required(),
        role: joi_1.default.string().trim().required(),
    }));
    const contractDB = await getById(id);
    if (role == "CANDIDATE") {
        contractDB.statuscandidate = status;
    }
    else {
        contractDB.statuscompany = status;
    }
    await typeorm_1.getRepository(ContractDB_1.default).save(contractDB);
    return contractDB;
}
async function getById(id) {
    const contractDB = await typeorm_1.getRepository(ContractDB_1.default).findOne(id);
    if (contractDB === undefined)
        throw new EntityNotFoundError_1.default("Resource not found");
    return contractDB;
}
async function multerData(filename, token, email, role, id, contractname) {
    await request.post({
        url: 'https://api.in1.echosign.com/api/rest/v6/transientDocuments',
        formData: {
            File: fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "public", "notes", filename)),
        },
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
    }, function (error, response, body) {
        const obj = JSON.parse(body);
        let transientDocumentId = obj.transientDocumentId;
        var agreementCreationRequest = {
            "fileInfos": [{
                    "transientDocumentId": transientDocumentId
                }],
            "name": contractname,
            "participantSetsInfo": [{
                    "memberInfos": [{
                            "email": email
                        }],
                    "order": 1,
                    "role": "SIGNER"
                }],
            "signatureType": "ESIGN",
            "state": "IN_PROCESS"
        };
        let rw = JSON.stringify(agreementCreationRequest);
        console.log(JSON.stringify(agreementCreationRequest));
        request.post({
            url: 'https://api.in1.echosign.com/api/rest/v6/agreements',
            body: agreementCreationRequest,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }, function (error, response, body) {
            Logger_1.default.info(body.id);
            saveTodb(body.id, role, id);
        });
    });
}
async function saveTodb(agreement, role, id) {
    Logger_1.default.info(agreement + " " + id);
    const contractDB = await getById(id);
    if (role == "COMPANY") {
        contractDB.agreementid = agreement;
    }
    else {
        contractDB.transientid = agreement;
    }
    await typeorm_1.getRepository(ContractDB_1.default).save(contractDB);
}
async function getSigningURL(agreementid, token) {
    let urlvalue = `https://api.in1.echosign.com/api/rest/v6/agreements/${agreementid}/signingUrls`;
    console.log(urlvalue);
    request.get({
        url: urlvalue,
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': '*/*'
        }
    }, function (error, response, body) {
        console.log(body);
    });
}
exports.default = {
    createContract,
    getContractCompany,
    getContractIdividual,
    getById,
    updateContract,
    updateContractStatus,
    multerData,
    getSigningURL
};
//# sourceMappingURL=ContractService.js.map