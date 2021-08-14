import { Request, Response } from "express";

export interface IRoute {
	(req: Request, res: Response, next: CallableFunction): Promise<void>;
}

/**
 * Manage the errors thrown in routes
 * @param route The route to wrap
 */
function wrapper(route: IRoute): IRoute {
	return async (req: Request, res: Response, next: CallableFunction): Promise<void> => {
		try {
			const returnValue = route(req, res, next);

			if (returnValue instanceof Promise) await returnValue;
		} catch (error) {
			next(error);
		}
	};
}

export default wrapper;
