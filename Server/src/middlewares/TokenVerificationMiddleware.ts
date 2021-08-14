import Joi from '@hapi/joi';
import { Request, Response } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import { Role } from '../models/UserDB';
import AuthService, { IPayload } from '../services/AuthService';

/**
 * Verify if the request has the permissions
 * to continue
 * 
 * All roles can access if the rol list is empty.
 * @param roles 
 * @returns the verificator middleware
 */
function middleware(roles:Role[] = []):(req:Request,res:Response,next:CallableFunction) => void {
	Joi.assert(
		roles,
		Joi.array().items(Joi.string().valid(...Object.values(Role)))
	)

	return (req:Request, res:Response, next:CallableFunction) => {
		try {
			if(!req.headers["authorization"])
				throw new UnauthorizedError("You need provide an token")
			
			const token = req.headers["authorization"].replace("Bearer ", "")
			
			const payload:IPayload = AuthService.getPayloadFromToken(token)

			if(roles.length != 0 && !roles.includes(payload.role))
				throw new UnauthorizedError("You aren't allowed to access to resource")
			
			req.payload = payload

			next()
		} catch (error) {
			next(error)
		}
	}
}

export default middleware