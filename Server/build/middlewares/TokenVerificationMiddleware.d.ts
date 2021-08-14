import { Request, Response } from 'express';
import { Role } from '../models/UserDB';
declare function middleware(roles?: Role[]): (req: Request, res: Response, next: CallableFunction) => void;
export default middleware;
//# sourceMappingURL=TokenVerificationMiddleware.d.ts.map