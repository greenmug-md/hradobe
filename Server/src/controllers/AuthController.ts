import { Request, Response } from "express";
import HttpStatus from 'http-status-codes';
import RouteWrapper from "../helpers/RouteWrapper";
import AuthService from "../services/AuthService";

async function logIn(req: Request, res: Response) {
	const { username, password, role } = req.body

	const token = await AuthService.logIn(username, password, role)

	res.status(HttpStatus.OK).json({ token })
}

export default {
	logIn: RouteWrapper(logIn)
}