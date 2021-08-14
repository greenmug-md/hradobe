import Joi from "@hapi/joi";
import fs from "fs";
import path from "path";
import { getRepository } from "typeorm";
import EntityNotFoundError from '../errors/EntityNotFoundError';
import ContractDB, { Role } from "../models/ContractDB";
import logger from "../utils/Logger";
var request = require('request');
/**
 * Get user by credentials
 * @param company 
 * @param role 
 * @returns The Contract object
 */
async function getContractCompany(company:string, role: string):Promise<ContractDB[] | undefined> {
	Joi.assert(
		{
			company,
			role
		},
		Joi.object({
			company: Joi.string().trim().required(),
			role : Joi.string().trim().required()
		})
	)
	
	return await getRepository(ContractDB).find({
		where: {
			company,
			role
		}
	})
}

/**
 * Get user by credentials
 * @param company 
 * @param role 
 * @returns The Contract object
 */
async function getContractIdividual(userId: string):Promise<ContractDB[] | undefined> {
	Joi.assert(
		{
            userId
		},
		Joi.object({
            userId: Joi.string().trim().required()
		})
	)
	
	return await getRepository(ContractDB).find({
		where: {
            userId
		}
	})
}
 

export interface ICreateContract {
	filename : string,
	userId: string,
	firstname: string,
	lastname: string,
    username: string,
	email: string,
	company:string,
    statuscandidate:string,
	statuscompany:string,
    contractname:string,
	role: Role,
	html:string
}

/**
 * Create an contract
 * @param filename 
 * @param userId 
 * @param firstname 
 * @param lastname 
 * @param username
 * @param email
 * @param company 
 * @param statuscandidate 
 * @param statuscompany 
 * @param contractname
 * @param approvedcandidate
 * @param role
 * @param html
 */
async function createContract(createContract: ICreateContract):Promise<void> {
	Joi.assert(
		createContract,
		Joi.object({
			filename: Joi.string().required(),
			userId: Joi.string().required(),
			firstname : Joi.string().optional(),
			lastname:  Joi.string().optional(),
            username: Joi.string().required(),
            email : Joi.string().required(),
			company :Joi.string().required(),
            statuscandidate :Joi.string().required(),
			statuscompany :Joi.string().required(),
            contractname :Joi.string().required(),
			role: Joi.string().valid(...Object.values(Role)),
			html:Joi.string().required()
		})
	)

 
	const newContractDB = new ContractDB()

	newContractDB.filename = createContract.filename
	newContractDB.userId = createContract.userId
	newContractDB.firstname = createContract.firstname
	newContractDB.lastname = createContract.lastname
	newContractDB.company = createContract.company
	newContractDB.email = createContract.email
	newContractDB.username = createContract.username
    newContractDB.statuscandidate = createContract.statuscandidate
	newContractDB.statuscompany = createContract.statuscompany
    newContractDB.contractname = createContract.contractname
	newContractDB.role = createContract.role
	newContractDB.html = createContract.html
	await getRepository(ContractDB).save(newContractDB)
}

async function updateContract(filename: string,id: string, html: string):Promise<ContractDB> {
	Joi.assert(
		{
			filename,
			id,
			html,
		},
		Joi.object({
			filename:Joi.string().required(),
			id: Joi.string().guid().required(),
			html: Joi.string().trim().required(),
		})
	);

	const contractDB: ContractDB = await getById(id);

	contractDB.html = html;
	contractDB.filename = filename;
 
	
	await getRepository(ContractDB).save(contractDB);

	return contractDB;
}

async function updateContractStatus(id: string, status: string, role: string):Promise<ContractDB> {
	Joi.assert(
		{
			id,
			status,
			role,
		},
		Joi.object({
			id:Joi.string().guid().required(),
			status: Joi.string().trim().required(),
			role: Joi.string().trim().required(),
		})
	);

	const contractDB: ContractDB = await getById(id);

	if(role == "CANDIDATE") {
		contractDB.statuscandidate = status;
	}else {
		contractDB.statuscompany = status;
	}
	
	await getRepository(ContractDB).save(contractDB);

	return contractDB;
}



/**
 * Get a resource
 * @param id
 * @returns The resourceDB
 * @throws EntityNotFoundError
 */
async function getById(id: string): Promise<ContractDB> {
	const contractDB: ContractDB | undefined = await getRepository(ContractDB).findOne(id);

	if (contractDB === undefined) throw new EntityNotFoundError("Resource not found");

	return contractDB;
}


async function multerData(filename: string, token :string, email: string, role:string, id: string, contractname : string): Promise<void> {
	await request.post({
        url: 'https://api.in1.echosign.com/api/rest/v6/transientDocuments',
        formData: {
            File: fs.createReadStream(path.join(__dirname, "..", "public", "notes",filename)),
        },
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
       
    }, function(error : any, response : any, body:any) {
		const obj = JSON.parse(body);
		let transientDocumentId =  obj.transientDocumentId
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
			}
			let rw = JSON.stringify(agreementCreationRequest)
			console.log(JSON.stringify(agreementCreationRequest));
			request.post({
			url : 'https://api.in1.echosign.com/api/rest/v6/agreements', 
			body: agreementCreationRequest,
			json: true,
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token}`
			}
		}, function(error : any, response : any, body:any) {
			logger.info(body.id)
			saveTodb(body.id, role, id);
		})
	})
}

async function saveTodb(agreement: string,role: string, id:string) : Promise<void>{
	logger.info(agreement+" "+id)
	const contractDB: ContractDB = await getById(id);
	if(role == "COMPANY") {
		contractDB.agreementid =agreement
	}else {
		contractDB.transientid = agreement;
	}
 
	await getRepository(ContractDB).save(contractDB);
}
 
async function getSigningURL (agreementid: string, token: string) {
	let urlvalue= `https://api.in1.echosign.com/api/rest/v6/agreements/${agreementid}/signingUrls`
            console.log(urlvalue);
            request.get({
                url : urlvalue,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': '*/*'
                }
            }, function(error : any, response : any, body:any) {
                console.log(body);
     
            })

}
export default {
	createContract,
	getContractCompany,
    getContractIdividual,
	getById,
	updateContract,
	updateContractStatus,
	multerData,
	getSigningURL
}