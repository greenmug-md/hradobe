import AxiosInstance from "./AxiosInstance";

let axios = AxiosInstance.getInstance()

/**
 * Get Candidate Data By Company
 * @param {string} id 
 */
async function getByCompany(company) {
	let response = await axios.get(`/candidates/${company}`)
	return response.data
}

/**
 * Get Candidate Data By Company and Email
 * @param {string} id 
 */
async function getByEmailCompany(email, company, role) {
    let response = await axios.post("/candidates/email", {
		email,
		company,
        role
	});

	return response.data
}

/**
 * Get Candidate Data By Last Name and Company
 * @param {string} lastname
 * @param {string} company
 * @param {string} role
 */
async function getByNameCompany(lastname, company, role) {
    let response = await axios.post("/candidates/lastname", {
		lastname,
		company,
        role
	});

	return response.data
}

 
 

export default {
	getByCompany,
	getByEmailCompany,
    getByNameCompany
}