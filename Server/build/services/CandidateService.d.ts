import UserDB from "../models/UserDB";
declare function getByEmailCompany(email: string, company: string, role: string): Promise<UserDB[] | undefined>;
declare function getByNameCompany(lastname: string, company: string, role: string): Promise<UserDB[] | undefined>;
declare const _default: {
    getByEmailCompany: typeof getByEmailCompany;
    getByNameCompany: typeof getByNameCompany;
};
export default _default;
//# sourceMappingURL=CandidateService.d.ts.map