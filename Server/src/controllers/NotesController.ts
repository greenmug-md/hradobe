import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import RouteWrapper from "../helpers/RouteWrapper";
import NotesService from "../services/NotesService";

/**
 * Get all classes
 * @param req The request object
 * @param res The resopnse object
 */
async function createNotes(req:Request, res:Response) {
	res.status(HttpStatus.OK).json({
		fileName: await NotesService.toPDF(req.body)
	})
}



export default {
	createNotes: RouteWrapper(createNotes)
}