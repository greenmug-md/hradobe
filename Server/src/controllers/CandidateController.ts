import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import RouteWrapper from "../helpers/RouteWrapper";
import CandidateService from "../services/CandidateService";

/**
 * Get resource by id
 * @param req The request object
 * @param res The resopnse object
 */
async function getByEmailCompany(req: Request, res: Response) {

	res.status(HttpStatus.OK).json(await CandidateService.getByEmailCompany(req.params.email, req.params.company, req.params.role));
}

async function getByNameCompany(req: Request, res: Response) {
    const { lastname, company, role } = req.body
	res.status(HttpStatus.OK).json(await CandidateService.getByNameCompany(lastname, company, role));
}
 

export default {
	getByEmailCompany: RouteWrapper(getByEmailCompany),
    getByNameCompany: RouteWrapper(getByNameCompany)
};