import { Request, Response } from "express";
export interface IRoute {
    (req: Request, res: Response, next: CallableFunction): Promise<void>;
}
declare function wrapper(route: IRoute): IRoute;
export default wrapper;
//# sourceMappingURL=RouteWrapper.d.ts.map