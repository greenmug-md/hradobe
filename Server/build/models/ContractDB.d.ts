export declare enum Role {
    CANDIDATE = "CANDIDATE",
    COMPANY = "COMPANY"
}
export declare enum status {
    DRAFT = "DRAFT",
    FINALIZED = "FINALIZED",
    APPROVED = "APPROVED",
    SIGNED = "SIGNED"
}
export declare enum nextstatus {
    FINALIZE = "FINALIZE",
    APPROVE = "APPROVE",
    SIGN = "SIGN"
}
export default class ContractDB {
    id: string;
    filename: string;
    userId: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    company: string;
    statuscandidate: string;
    statuscompany: string;
    approvedcandidate: boolean;
    approvedcompany: boolean;
    signedcandidate: boolean;
    signedcompany: boolean;
    signeddocumentcandidate: string;
    signeddocumentcompany: string;
    transientid: string;
    agreementid: string;
    contractname: string;
    role: Role;
    html: string;
}
//# sourceMappingURL=ContractDB.d.ts.map