import HttpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import BadParameterError from '../errors/BadParameterError';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import InvalidTokenError from '../errors/InvalidTokenError';
import Joi from '@hapi/joi';
import logger from '../utils/Logger';

/**
 * Manage and send the corresponding error status and message
 * according to generated error
 * @param error The error instance
 * @param req The request object
 * @param res The response object
 * @param next Nex middleware
 */
function middleware(error:Error, req:Request, res:Response, next:CallableFunction):void {
	let statusResponse = HttpStatus.INTERNAL_SERVER_ERROR

	const responseObject = {
		message: error.message || ""
	}
	
	if(error instanceof BadParameterError) {
		statusResponse = HttpStatus.BAD_REQUEST
	}
	else if(error instanceof EntityNotFoundError) {
		statusResponse = HttpStatus.NOT_FOUND
	}
	else if(error instanceof InvalidTokenError) {
		statusResponse = HttpStatus.UNAUTHORIZED
	}
	else if(Joi.isError(error)) {
		statusResponse = HttpStatus.BAD_REQUEST
		responseObject.message = ""

		for(const detailError of error.details)
			responseObject.message += `${detailError.message} - `
	}

	logger.error(error)
	res.status(statusResponse).json(responseObject)
	next()
}

export default middleware