import { Request, Response } from 'express';
import HttpStatus from "http-status-codes";
import RouteWrapper from "../helpers/RouteWrapper";
import UserService from '../services/UserService';

/**
 * Create an account
 * @param req The request object
 * @param res The response object
 */
async function signUp(req:Request, res:Response) {
	await UserService.create(req.body)

	res.status(HttpStatus.CREATED).send()
}

/**
 * Get the basic information about user according to
 * its token
 * @param req The request object
 * @param res The response object
 */
async function current(req:Request, res:Response) {
	res.status(HttpStatus.OK).json(req.payload)

}



export default {
	signUp: RouteWrapper(signUp),
	current: RouteWrapper(current)
}