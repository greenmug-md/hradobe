import Joi from "@hapi/joi"
import Axios from "axios"

let axios = null
/**
 * Obtain the axios instace
 * @returns The axios instance
 */
function getInstanceSign() {
	if(!axios)
    initInstanceSign()
	
	return axios
}

/**
 * Stablish the authorization header with
 * the token probided
 */
function setTokenSign(token) {
	Joi.assert(
		token,
		Joi.string().required()
	)

	axios = getInstanceSign()

	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}


/**
 * Start the axios instance
 */
function initInstanceSign() {
	axios = Axios.create({
		baseURL: "https://api.in1.echosign.com" 
	})
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
	getInstanceSign,
	setTokenSign
}