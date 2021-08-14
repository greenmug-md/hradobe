import Crypto from "crypto"

/**
 * Generate a random HEX hash
 * @returns {string}
 */
function getRandomHash() {
	var current_date = (new Date()).valueOf().toString();

	var random = Math.random().toString();
	
	return Crypto.createHash('sha1').update(current_date + random).digest('hex');
}

export default {
	getRandomHash
}