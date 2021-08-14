import { Request, Response } from 'express';
import HttpStatus from "http-status-codes";
import RouteWrapper from "../helpers/RouteWrapper";
import ContractService from '../services/ContractService';

/**
 * Create an account
 * @param req The request object
 * @param res The response object
 */
async function createContract(req:Request, res:Response) {
	await ContractService.createContract(req.body)
	res.status(HttpStatus.CREATED).send()
}

/**
 * Create an account
 * @param req The request object
 * @param res The response object
 */
async function updateContract(req:Request, res:Response) {
    const { filename,id, html } = req.body
    res.status(HttpStatus.OK).json(await ContractService.updateContract(filename, id, html));
}

async function updateContractStatus(req:Request, res:Response) {
    const { id, status, role } = req.body
    res.status(HttpStatus.OK).json(await ContractService.updateContractStatus(id, status, role));
}


async function  getContract(req:Request, res:Response) {
    const { id } = req.body
    res.status(HttpStatus.OK).json(await ContractService.getById(id));
}

/**
 * Get the basic information about user according to
 * @param req The request object
 * @param res The response object
 */
async function getContractCompany(req:Request, res:Response) {
    const { company, role } = req.body
    res.status(HttpStatus.OK).json(await ContractService.getContractCompany(company, role))
}

/**
 * Get the basic information about user according to
 * @param req The request object
 * @param res The response object
 */
async function getContractIdividual(req:Request, res:Response) {
    const {  userId } = req.body
    res.status(HttpStatus.OK).json(await ContractService.getContractIdividual(userId))
}

async function multerData(req:Request, res:Response) {
	const { filename, token, email, role,id,contractname } = req.body
	res.status(HttpStatus.OK).json(await ContractService.multerData(filename,token,email,role,id,contractname));
}

async function getSigningURL(req:Request, res:Response) {
	const { agreementid,id } = req.body
	res.status(HttpStatus.OK).json(await ContractService.getSigningURL(agreementid,id));
}


export default {
	createContract: RouteWrapper(createContract),
	getContractCompany: RouteWrapper(getContractCompany),
    getContractIdividual : RouteWrapper(getContractIdividual),
    updateContract: RouteWrapper(updateContract),
    getContract:  RouteWrapper(getContract),
    updateContractStatus :  RouteWrapper(updateContractStatus),
    multerData : RouteWrapper(multerData),
    getSigningURL:RouteWrapper(getSigningURL),
}