import Axios from "./AxiosInstance";
let axios = Axios.getInstance();

/**
 * Get token according to credentials
 * @param {string} username
 * @param {string} password
 * @returns The token
 */
async function logIn(username, password, role) {
	let response = await axios.post("/auth/logIn", {
		username,
		password,
        role
	});
	return response.data.token;
}

export default {
	logIn,
};
