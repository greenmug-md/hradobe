/**
 * @typedef {object} NoteData
 * @property {string} canvasSVG
 */

import AxiosSingleton from "./AxiosInstance"

let axios = AxiosSingleton.getInstance()

/**
 * Create a PDF
 * @param {PDF[]} pdfdata 
 */
async function create(notesData) {
	let response = await axios.post("/notes", notesData)
	return response.data
}

export default {
	create
}