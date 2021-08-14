"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTE_DATA_SCHEMA = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const CreatePDFService_1 = __importDefault(require("./CreatePDFService"));
var fsa = require('mz/fs');
var pdfjs = require('pdfjs-dist');
var request = require('request');
exports.NOTE_DATA_SCHEMA = joi_1.default.object({
    canvasSVG: joi_1.default.string().required(),
});
async function toPDF(notesData) {
    joi_1.default.assert(notesData, joi_1.default.array().items(exports.NOTE_DATA_SCHEMA).required());
    let htmlTemplate = fs_1.default
        .readFileSync(path_1.default.join(__dirname, "..", "public", "export_notes_base", "index.html"))
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
    const zip = new adm_zip_1.default();
    zip.addFile("index.html", Buffer.alloc(htmlTemplate.length, htmlTemplate));
    const zipName = `${uuid_1.v4()}.zip`;
    const pdfName = zipName.replace(".zip", ".pdf");
    const zipPath = path_1.default.join(__dirname, "..", "public", "tmp", zipName);
    zip.writeZip(zipPath);
    await CreatePDFService_1.default.create(zipPath, pdfName);
    fs_1.default.unlinkSync(zipPath);
    return pdfName;
}
exports.default = {
    toPDF
};
//# sourceMappingURL=NotesService.js.map