import Joi from "@hapi/joi";
import AmdZip from "adm-zip";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import CreatePDFService from "./CreatePDFService";
var fsa = require('mz/fs');
var request = require('request');
/**
 * Structure of note data
 */
export interface INoteData {
	canvasSVG: string;
}

/**
 * Joi schema for note data
 */
export const NOTE_DATA_SCHEMA = Joi.object({
	canvasSVG: Joi.string().required(),
});

/**
 * Convert the note data list to pdf
 *
 * @param notesData The notes data to save as PDF
 *
 * @returns The pdf file name
 */
async function toPDF(notesData: INoteData[]): Promise<string> {
	Joi.assert(notesData, Joi.array().items(NOTE_DATA_SCHEMA).required());

	let htmlTemplate: string = fs
		.readFileSync(path.join(__dirname, "..", "public", "export_notes_base", "index.html"))
		.toString();

	let htmlToInsert = "";

	for (const noteData of notesData) {
		htmlToInsert += `
			<div >
				${noteData.canvasSVG}
			</div>
		`;
	}

	htmlTemplate = htmlTemplate.replace("{{TO_INSERT}}", htmlToInsert);

	const zip = new AmdZip();

	zip.addFile("index.html", Buffer.alloc(htmlTemplate.length, htmlTemplate));

	const zipName = `${uuidv4()}.zip`;
	const pdfName = zipName.replace(".zip", ".pdf");
	const zipPath = path.join(__dirname, "..", "public", "tmp", zipName);

	zip.writeZip(zipPath);

	await CreatePDFService.create(zipPath, pdfName);

	fs.unlinkSync(zipPath);

	return pdfName;
}

 
 

export default {
	toPDF
};
