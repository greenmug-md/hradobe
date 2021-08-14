import Joi from "@hapi/joi";
import { getRepository, Like } from "typeorm";
import UserDB from "../models/UserDB";
/**
 * Get a resource
 * @param email
 * @param company
 * @param role
 * @returns The UserDB
 * @throws EntityNotFoundError
 */
async function getByEmailCompany(email:string, company:string, role: string):Promise<UserDB[] | undefined> {
	Joi.assert(
		{
			email,
			company,
            role
		},
		Joi.object({
			email: Joi.string().trim().required(),
			company: Joi.string().required(),
            role: Joi.string().required()
        })
	)
	
	return await getRepository(UserDB).find({
		where: {
			email,
			company,
            role
		}
	})
}


/**
 * Get a resource
 * @param lastname
 * @param company
 * @param role
 * @returns The UserDB
 * @throws EntityNotFoundError
 */
async function getByNameCompany(lastname:string, company:string, role:string):Promise<UserDB[] | undefined> {
	Joi.assert(
		{
			lastname,
			company,
            role
		},
		Joi.object({
			lastname: Joi.string().trim().required(),
			company: Joi.string().required(),
            role: Joi.string().required()
        })
	)
	
	return await getRepository(UserDB).find({
		where: {
			lastname: Like(`%${lastname}%`),
			company,
            role
		}
	})
}



export default {
	getByEmailCompany,
    getByNameCompany
};