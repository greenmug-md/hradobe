import Joi from "@hapi/joi";
import Session from "../utils/Session";
import Role from "./constants";
/**
 * Verify is the current session data 
 * @param role 
 */
function verifySession(role) {
	Joi.assert(
		role,
		Joi.string().valid(...Object.values(Role)).required()
	)

	let data = Session.getData()
	
	return data && data.role && data.role === role
}

export default verifySession