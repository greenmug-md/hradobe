import AxiosInstance from "./AxiosInstance";

let axios = AxiosInstance.getInstance();

/**
 * Create an account
 * @param {object} data
 * @param {string} data.firstname
 * @param {string} data.lastname
 * @param {string} data.username
 * @param {string} data.password
 * @param {string} data.role
 * @returns void
 */
async function signUp(data) {
    console.log("signUp")
	await axios.post("/user/signUp", data);
}

/**
 * Get the basic information about current user
 * identified by its token
 * @returns The basic account data
 */
async function currentUser() {
	let response = await axios.get("/user/current");
	return response.data;
}

export default {
	signUp,
	currentUser
};