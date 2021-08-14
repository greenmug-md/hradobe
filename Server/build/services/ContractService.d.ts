import ContractDB, { Role } from "../models/ContractDB";
declare function getContractCompany(company: string, role: string): Promise<ContractDB[] | undefined>;
declare function getContractIdividual(userId: string): Promise<ContractDB[] | undefined>;
export interface ICreateContract {
    filename: string;
    userId: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    company: string;
    statuscandidate: string;
    statuscompany: string;
    contractname: string;
    role: Role;
    html: string;
}
declare function createContract(createContract: ICreateContract): Promise<void>;
declare function updateContract(filename: string, id: string, html: string): Promise<ContractDB>;
declare function updateContractStatus(id: string, status: string, role: string): Promise<ContractDB>;
declare function getById(id: string): Promise<ContractDB>;
declare function multerData(filename: string, token: string, email: string, role: string, id: string, contractname: string): Promise<void>;
declare function getSigningURL(agreementid: string, token: string): Promise<void>;
declare const _default: {
    createContract: typeof createContract;
    getContractCompany: typeof getContractCompany;
    getContractIdividual: typeof getContractIdividual;
    getById: typeof getById;
    updateContract: typeof updateContract;
    updateContractStatus: typeof updateContractStatus;
    multerData: typeof multerData;
    getSigningURL: typeof getSigningURL;
};
export default _default;
//# sourceMappingURL=ContractService.d.ts.map