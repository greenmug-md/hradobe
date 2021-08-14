/* eslint-disable */

import { IPayload } from "../../src/services/AuthService"

declare global {
  namespace Express {
      export interface Request {
          payload: IPayload;
      }
  }
}