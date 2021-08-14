import Joi from "@hapi/joi"
import Axios from "axios"
import config from "../utils/config"
let axios = null

/**
 * Obtain the axios instace
 * @returns The axios instance
 */
function getInstance() {
	if(!axios)
		initInstance()
	
	return axios
}

/**
 * Stablish the authorization header with
 * the token probided
 */
function setToken(token) {
	Joi.assert(
		token,
		Joi.string().required()
	)

	axios = getInstance()

	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

/**
 * Start the axios instance
 */
function initInstance() {
	axios = Axios.create({
		baseURL: config.BASE_SERVER_URL 
	})
	console.log(initInstance);
	axios.interceptors.response.use(
		response => response,
		error => {
			if(error.response && error.response.data && error.response.data.message)
				return Promise.reject(new Error(error.response.data.message))
			
			return Promise.reject(error)
		}
	)
}

export default {
	getInstance,
	setToken
}