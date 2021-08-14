import UserDB, { Role } from "../models/UserDB";
export interface IPayload {
    id: string;
    role: Role;
    username: string;
    company: string;
    email: string;
}
declare function generateTokenFromUser(userDB: UserDB): string;
declare function getPayloadFromToken(token: string): IPayload;
declare function logIn(username: string, password: string, role: string): Promise<string>;
declare const _default: {
    generateTokenFromUser: typeof generateTokenFromUser;
    getPayloadFromToken: typeof getPayloadFromToken;
    logIn: typeof logIn;
};
export default _default;
//# sourceMappingURL=AuthService.d.ts.map