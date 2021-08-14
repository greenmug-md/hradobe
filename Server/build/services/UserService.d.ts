import UserDB, { Role } from "../models/UserDB";
declare function getByCredentials(username: string, password: string, role: string): Promise<UserDB | undefined>;
declare function usernameAlreadyRegistered(username: string): Promise<boolean>;
declare function emailAlreadyRegistered(email: string): Promise<boolean>;
export interface ICreateUser {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    company: string;
    email: string;
    role: Role;
}
declare function create(createUser: ICreateUser): Promise<void>;
declare const _default: {
    create: typeof create;
    usernameAlreadyRegistered: typeof usernameAlreadyRegistered;
    emailAlreadyRegistered: typeof emailAlreadyRegistered;
    getByCredentials: typeof getByCredentials;
};
export default _default;
//# sourceMappingURL=UserService.d.ts.map