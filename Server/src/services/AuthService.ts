import Joi from "@hapi/joi";
import config from "config";
import jwt from "jsonwebtoken";
import BadParameterError from "../errors/BadParameterError";
import InvalidTokenError from "../errors/InvalidTokenError";
import UserDB, { Role } from "../models/UserDB";
import UserService from "./UserService";

/**
 * Interface of data encoded in JWT token
 */
export interface IPayload {
	id: string;
	role: Role;
	username: string;
	company:string;
	email:string
}

/**
 * Generate token from userDB
 * @param userDB The userDB object
 */
function generateTokenFromUser(userDB: UserDB): string {
	Joi.assert(
		{
			id: userDB.id,
			role: userDB.role,
			username: userDB.username,
			company: userDB.company,
			email:userDB.email
		},
		Joi.object({
			id: Joi.string().guid().required(),
			role: Joi.valid(...Object.values(Role)).required(),
			username: Joi.string().required(),
			company: Joi.string().required(),
			email: Joi.string().required()
		})
	);

	const payload: IPayload = {
		id: userDB.id,
		role: userDB.role,
		username: userDB.username,
		company: userDB.company,
		email:userDB.email
	};

	return jwt.sign(payload, config.get("JWT_KEY"));
}

/**
 * Get the payload from token provided
 * @param token
 */
function getPayloadFromToken(token: string): IPayload {
	Joi.assert(token, Joi.string().required());

	try {
		const payload:IPayload = <IPayload>jwt.verify(token, config.get("JWT_KEY"));

		return payload
	} catch (error) {
		throw new InvalidTokenError("Invalid token");
	}
}

/**
 * Generate user token according to their credentials
 * @param username
 * @param password
 */
async function logIn(username: string, password: string, role : string): Promise<string> {
	Joi.assert(
		{
			username,
			password,
			role
		},
		Joi.object({
			username: Joi.string().trim().required(),
			password: Joi.string().required(),
			role : Joi.string().required()
		})
	);

	const userDB: UserDB | undefined = await UserService.getByCredentials(username, password, role);

	if (userDB === undefined) throw new BadParameterError("Incorrect username or password");

	return generateTokenFromUser(userDB);
}

export default {
	generateTokenFromUser,
	getPayloadFromToken,
	logIn
};
