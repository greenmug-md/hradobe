import AxiosInstance from "./AxiosInstance";

let axios = AxiosInstance.getInstance();

/**
 * Create an account
 * @param {object} data
 * @param {string} data.firstname
 * @param {string} data.lastname
 * @param {string} data.username
 * @param {string} data.email
 * @param {string} data.role
 * @param {string} data.id
 * @param {string} data.company
 * @param {string} data.statuscandidate
 * @param {string} data.statuscompany
 * @param {string} data.filename
 * @param {string} data.contractname
 * @returns void
 */
async function contractCreate(data) {
    let response = await axios.post("/contract/create", data);
    return response.data;
}

/**
 * Update a Contract
 * @param {object} data
 * @returns void
 */
async function updateContract(data) {
	await axios.post("/contract/update", data);
}

async function  updateContractStatus(data) {    
    await axios.post("/contract/updatestatus", data);
}
/**
 * Get Contract
 * @param {object} data
 * @param {string} data.role
 * @param {string} data.company
 * @returns contract
 */
async function contractgetByCompany(company, role) {
	let response = await axios.post("/contract/company",{
		company,
        role
    })
    return response.data;
}

/**
 * Get Contract By Id
 * @param {object} data
 * @param {string} data.id
 * @returns contract
 */
async function getById(id) {
    console.log("here"+id);
	let response = await axios.post("/contract/get",{
		id
    })
    return response.data;
}

/**
 * Create an Contract
 * @param {object} data
 * @param {string} data.role
 * @param {string} data.id
 * @param {string} data.company
 * @returns contract
 */
async function contractgetIndividual(userId) {
    console.log(userId)
	let response = await axios.post("/contract/individual" ,{
        userId
    })
    return response.data;
}

export default {
	contractCreate,
    contractgetByCompany,
    contractgetIndividual,
    updateContract,
    getById,
    updateContractStatus
};